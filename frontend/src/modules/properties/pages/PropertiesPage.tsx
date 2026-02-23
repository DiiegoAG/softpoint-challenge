import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
    Home,
    Search,
    Plus
} from 'lucide-react';

import type { CreatePropertyPayload, Property, LaravelValidationError } from '../properties.types';
import type { AxiosError } from 'axios';

import { useProperties } from '../hooks/useProperties'
import { useCreateProperty } from '../hooks/useCreateProperty';
import PropertyForm from '../components/PropertyForm';
import { useUpdateProperty } from '../hooks/useUpdateProperty';
import { useDeleteProperty } from '../hooks/useDeleteProperty';

import PropertyCard from '../components/PropertyCard';
import Modal from '@/components/ui/Modal';
import ConfirmationAlert from '@/components/ui/ConfirmationAlert';

const PropertiesPage = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useProperties()
    const createMutation = useCreateProperty();
    const updateMutation = useUpdateProperty();
    const deleteMutation = useDeleteProperty();

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [editingProperty, setEditingProperty] = useState<Property | null>(null)
    const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null)
    const [search, setSearch] = useState('');

    const mutationError = (createMutation.error || updateMutation.error) as AxiosError<LaravelValidationError>;
    const errors = mutationError?.response?.data?.errors;

    const filteredProperties = data?.filter(property =>
        property.name.toLowerCase().includes(search.toLowerCase()) ||
        property?.full_address?.toLowerCase().includes(search.toLowerCase())
    ) || [];

    const handleOpenCreate = () => {
        setEditingProperty(null);
        createMutation.reset();
        setIsModalOpen(true);
    };

    const handleOpenEdit = (property: Property) => {
        setEditingProperty(property);
        updateMutation.reset();
        setIsModalOpen(true);
    };

    const handleOpenDelete = (property: Property) => {
        setPropertyToDelete(property);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (!propertyToDelete) return;

        deleteMutation.mutate(propertyToDelete.id, {
            onSuccess: () => {
                toast.success('Property deleted successfully');
                setIsDeleteModalOpen(false);
                setPropertyToDelete(null);
            },
            onError: (err: Error) => {
                const axiosError = err as AxiosError<{ message: string }>;
                toast.error(axiosError?.response?.data?.message || 'Failed to delete property');
            }
        });
    };

    const handleSubmit = (formData: CreatePropertyPayload) => {
        if (editingProperty) {
            updateMutation.mutate({
                id: editingProperty.id,
                payload: formData
            }, {
                onSuccess: () => {
                    toast.success('Property updated successfully');
                    setIsModalOpen(false);
                },
                onError: (err: Error) => {
                    const axiosError = err as AxiosError<{ message: string }>;
                    toast.error(axiosError?.response?.data?.message || 'Failed to update property');
                }
            });
        } else {
            createMutation.mutate(formData, {
                onSuccess: () => {
                    toast.success('Property created successfully');
                    setIsModalOpen(false);
                },
                onError: (err: Error) => {
                    const axiosError = err as AxiosError<{ message: string }>;
                    toast.error(axiosError?.response?.data?.message || 'Failed to create property');
                }
            });
        }
    };

    const getInitialData = (property: Property | null): CreatePropertyPayload | undefined => {
        if (!property) return undefined;
        return {
            name: property.name,
            real_state_type: property.real_state_type,
            street: property.street,
            external_number: property.external_number,
            internal_number: property.internal_number,
            neighborhood: property.neighborhood,
            city: property.city,
            country: property.country,
            rooms: Number(property.rooms),
            bathrooms: Number(property.bathrooms),
            price: Number(property.price),
            comments: property.comments
        };
    };

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden font-sans">
            {/* Background with parallax-like effect */}
            <div
                className="fixed inset-0 z-0 scale-105"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.5)'
                }}
            />

            {/* Animated Overlay Circles */}
            <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[100px] animate-pulse" />
            <div className="fixed bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                            My <span className="text-blue-400">Properties</span>
                        </h1>
                        <p className="text-blue-100/70 text-lg font-medium">Manage and explore your real estate listings.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group flex-1 md:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-100/50 group-focus-within:text-blue-400 transition-colors">
                                <Search size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by name or city..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all backdrop-blur-md"
                            />
                        </div>
                        <button
                            onClick={handleOpenCreate}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all"
                        >
                            <Plus size={20} />
                            <span className="hidden sm:inline">Add Property</span>
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <PropertyCard key={n} isLoading />
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/20 p-8 rounded-3xl text-center">
                        <p className="text-red-200 font-medium">Error loading properties: {error.message}</p>
                    </div>
                )}

                {/* Data Grid */}
                {data && filteredProperties.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProperties.map((property) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                onEdit={handleOpenEdit}
                                onDelete={handleOpenDelete}
                                onViewDetails={(p) => navigate(`/properties/${p.id}`)}
                            />
                        ))}
                    </div>
                )}

                {/* No Search Results */}
                {data && data.length > 0 && filteredProperties.length === 0 && (
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-16 rounded-3xl text-center space-y-4">
                        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/5 mb-2">
                            <Search size={48} className="text-blue-400 opacity-50" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">No properties match your search</h2>
                        <p className="text-blue-100/60 max-w-sm mx-auto">Try adjusting your terms or browse the full list.</p>
                        <button
                            onClick={() => setSearch('')}
                            className="mt-4 px-8 py-3 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-colors border border-white/10"
                        >
                            Clear Search
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {data && data.length === 0 && (
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-16 rounded-3xl text-center space-y-4">
                        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/5 mb-2">
                            <Home size={48} className="text-blue-400 opacity-50" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">No properties found</h2>
                        <p className="text-blue-100/60 max-w-sm mx-auto">It seems you haven't added any properties yet. Start by creating your first listing!</p>
                        <button
                            onClick={handleOpenCreate}
                            className="mt-4 px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-colors"
                        >
                            Create First Property
                        </button>
                    </div>
                )}
            </div>

            {/* Application Modals */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingProperty ? "Edit Property" : "Add New Property"}
            >
                <PropertyForm
                    onSave={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                    errors={errors || {}}
                    isPending={createMutation.isPending || updateMutation.isPending}
                    initialData={getInitialData(editingProperty)}
                />
            </Modal>

            <ConfirmationAlert
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                confirmDelete={handleDelete}
                isPending={deleteMutation.isPending}
            >
                <p className="text-blue-100/60">Are you sure you want to delete this property?</p>
            </ConfirmationAlert>
        </div>
    )
}

export default PropertiesPage
