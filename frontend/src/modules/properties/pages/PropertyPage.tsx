import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    MapPin,
    Bed,
    Bath,
    Calendar,
    User,
    Mail,
    MessageSquare,
    Globe,
    Building,
    Pencil
} from 'lucide-react';
import { useProperty } from '../hooks/useProperty';
import { useUpdateProperty } from '../hooks/useUpdateProperty';
import { formatCurrency } from '@/utils/formatCurrency';
import type { AxiosError } from 'axios';
import type { CreatePropertyPayload, Property, LaravelValidationError } from '../properties.types';
import Modal from '@/components/ui/Modal';
import PropertyForm from '../components/PropertyForm';
import toast from 'react-hot-toast';

const PropertyPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: property, isLoading, error } = useProperty(Number(id));
    const updateMutation = useUpdateProperty();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const mutationError = updateMutation.error as AxiosError<LaravelValidationError>;
    const errors = mutationError?.response?.data?.errors;

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (error || !property) {
        const axiosError = error as AxiosError<{ message: string }>;
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
                    <p>Error loading property: {axiosError?.response?.data?.message || axiosError?.message || 'Property not found'}</p>
                </div>
                <button
                    onClick={() => navigate('/properties')}
                    className="flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all"
                >
                    <ArrowLeft size={18} />
                    Back to Properties
                </button>
            </div>
        );
    }

    const handleUpdate = (formData: CreatePropertyPayload) => {
        updateMutation.mutate({
            id: property.id,
            payload: formData
        }, {
            onSuccess: (response) => {
                toast.success(response?.data?.message || 'Property updated successfully');
                setIsEditModalOpen(false);
            },
            onError: (err: Error) => {
                const axiosError = err as AxiosError<{ message: string }>;
                toast.error(axiosError?.response?.data?.message || 'Failed to update property');
            }
        });
    };

    const getInitialData = (p: Property): CreatePropertyPayload => {
        return {
            name: p.name,
            real_state_type: p.real_state_type,
            street: p.street,
            external_number: p.external_number,
            internal_number: p.internal_number,
            neighborhood: p.neighborhood,
            city: p.city,
            country: p.country,
            rooms: Number(p.rooms),
            bathrooms: Number(p.bathrooms),
            price: Number(p.price),
            comments: p.comments
        };
    };

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden font-sans pb-20">
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

            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Actions */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate('/properties')}
                        className="group cursor-pointer flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-blue-100/70 hover:text-white transition-all backdrop-blur-md"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back
                    </button>

                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="group cursor-pointer flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                    >
                        <Pencil size={18} />
                        Edit
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Main Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hero Section */}
                        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] -mr-32 -mt-32" />

                            <div className="relative space-y-6">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-widest">
                                        {property.real_state_type.replace('_', ' ')}
                                    </span>
                                    <span className="text-blue-100/40 font-medium text-sm">
                                        Ref: #{property.id}
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                                    {property.name}
                                </h1>

                                <div className="flex items-center gap-2 text-blue-100/60 text-lg">
                                    <MapPin className="text-blue-400" size={20} />
                                    <span>{property.full_address}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description / Comments */}
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] p-8 space-y-4">
                            <div className="flex items-center gap-3 text-blue-400 font-bold uppercase tracking-widest text-sm">
                                <MessageSquare size={18} />
                                <h3>About this Property</h3>
                            </div>
                            <p className="text-blue-100/70 text-lg leading-relaxed italic">
                                "{property.comments || 'No additional comments provided for this property.'}"
                            </p>
                        </div>

                        {/* Location Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] p-6 space-y-4">
                                <div className="flex items-center gap-3 text-blue-400 font-bold uppercase tracking-widest text-xs">
                                    <Building size={16} />
                                    <h3>Building Info</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                                        <span className="text-blue-100/40 text-sm">Street</span>
                                        <span className="text-white font-medium">{property.street}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                                        <span className="text-blue-100/40 text-sm">Ext. Number</span>
                                        <span className="text-white font-medium">{property.external_number}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                                        <span className="text-blue-100/40 text-sm">Int. Number</span>
                                        <span className="text-white font-medium">{property.internal_number || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] p-6 space-y-4">
                                <div className="flex items-center gap-3 text-blue-400 font-bold uppercase tracking-widest text-xs">
                                    <Globe size={16} />
                                    <h3>Area Details</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                                        <span className="text-blue-100/40 text-sm">Neighborhood</span>
                                        <span className="text-white font-medium">{property.neighborhood}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                                        <span className="text-blue-100/40 text-sm">City</span>
                                        <span className="text-white font-medium">{property.city}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                                        <span className="text-blue-100/40 text-sm">Country</span>
                                        <span className="text-white font-medium">{property.country}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Key Stats & Actions */}
                    <div className="space-y-8">
                        {/* Price Card */}
                        <div className="backdrop-blur-2xl bg-blue-600/20 border border-blue-500/30 rounded-[2rem] p-8 shadow-2xl flex flex-col items-center text-center space-y-2">
                            <span className="text-blue-100/60 font-bold uppercase tracking-widest text-xs">Asking Price</span>
                            <div className="text-4xl font-black text-white">
                                {formatCurrency(property.price)}
                            </div>
                            <span className="text-blue-300/80 text-sm font-medium">USD Currency</span>
                        </div>

                        {/* Quick Stats */}
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] p-8 grid grid-cols-2 gap-8">
                            <div className="flex flex-col items-center space-y-2">
                                <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400">
                                    <Bed size={32} />
                                </div>
                                <span className="text-2xl font-black text-white">{property.rooms}</span>
                                <span className="text-xs font-bold text-blue-100/40 uppercase tracking-widest">Rooms</span>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400">
                                    <Bath size={32} />
                                </div>
                                <span className="text-2xl font-black text-white">{property.bathrooms}</span>
                                <span className="text-xs font-bold text-blue-100/40 uppercase tracking-widest">Baths</span>
                            </div>
                        </div>

                        {/* Owner Card */}
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] p-8 space-y-6">
                            <div className="flex items-center gap-3 text-blue-400 font-bold uppercase tracking-widest text-xs">
                                <User size={16} />
                                <h3>Listed By</h3>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                                    {property.owner?.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-white font-bold text-lg">{property.owner?.name}</div>
                                    <div className="flex items-center gap-1.5 text-blue-100/40 text-sm">
                                        <Mail size={14} />
                                        <span>{property.owner?.email}</span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold transition-all flex items-center justify-center gap-2">
                                <Mail size={18} />
                                Contact Owner
                            </button>
                        </div>

                        {/* Date Info */}
                        <div className="flex items-center justify-center gap-2 text-blue-100/30 text-xs font-medium uppercase tracking-[0.2em]">
                            <Calendar size={14} />
                            <span>Listed on {new Date(property.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Property"
            >
                <PropertyForm
                    onSave={handleUpdate}
                    onCancel={() => setIsEditModalOpen(false)}
                    errors={errors || {}}
                    isPending={updateMutation.isPending}
                    initialData={getInitialData(property)}
                />
            </Modal>
        </div>
    );
};

export default PropertyPage;
