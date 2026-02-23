import { useState } from 'react';
import {
    Home,
    MapPin,
    Type,
    Hash,
    Globe,
    Bed,
    Bath,
    DollarSign,
    MessageSquare,
    ArrowRight
} from 'lucide-react';
import { REAL_STATE_TYPES, type CreatePropertyPayload } from '../properties.types';
import LoadingButton from '@/components/buttons/LoadingButton';
import FormErrors from '@/components/form/FormErrors';

interface PropertyFormProps {
    onSave: (formData: CreatePropertyPayload) => void;
    onCancel: () => void;
    errors: Record<string, string[]>
    isPending: boolean
    initialData?: CreatePropertyPayload
}

const PropertyForm = ({ onSave, onCancel, errors, isPending, initialData }: PropertyFormProps) => {

    const [formData, setFormData] = useState<CreatePropertyPayload>(initialData || {
        name: '',
        real_state_type: REAL_STATE_TYPES.HOUSE,
        street: '',
        external_number: '',
        internal_number: '',
        neighborhood: '',
        city: '',
        country: 'MX',
        rooms: 1,
        bathrooms: 1,
        price: 0,
        comments: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Only allow digits and one dot for decimal numbers
        const regex = /^[0-9]*\.?[0-9]*$/;

        if (regex.test(value) || value === '') {
            setFormData(prev => ({
                ...prev,
                [name]: value === '' ? 0 : Number(value)
            }));
        }
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
        }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4 md:col-span-2">
                    <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest">Base Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-blue-100/60 ml-1">Property Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-100/30 group-focus-within:text-blue-400 transition-colors">
                                    <Home size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Modern Apartment"
                                    className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                                />
                            </div>
                            <FormErrors error={errors?.name?.[0]} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-blue-100/60 ml-1">Property Type</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-100/30 group-focus-within:text-blue-400 transition-colors">
                                    <Type size={18} />
                                </div>
                                <select
                                    name="real_state_type"
                                    value={formData.real_state_type}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 bg-slate-800 border border-white/10 rounded-2xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                                >
                                    {Object.entries(REAL_STATE_TYPES).map(([key, value]) => (
                                        <option key={key} value={value} className="bg-slate-900">
                                            {key.charAt(0) + key.slice(1).toLowerCase().replace('_', ' ')}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <FormErrors error={errors?.real_state_type?.[0]} />
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-4 md:col-span-2">
                    <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest border-t border-white/5 pt-4">Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-1">
                            <label className="text-xs font-bold text-blue-100/60 ml-1">Street</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-100/30 group-focus-within:text-blue-400 transition-colors">
                                    <MapPin size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                                />
                            </div>
                            <FormErrors error={errors?.street?.[0]} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-blue-100/60 ml-1">Ext. Number</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-100/30 group-focus-within:text-blue-400 transition-colors">
                                    <Hash size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="external_number"
                                    value={formData.external_number}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                                />
                            </div>
                            <FormErrors error={errors?.external_number?.[0]} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-blue-100/60 ml-1">Int. Number (Optional)</label>
                            <input
                                type="text"
                                name="internal_number"
                                value={formData.internal_number || ''}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                            />
                            <FormErrors error={errors?.internal_number?.[0]} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-blue-100/60 ml-1">Neighborhood</label>
                            <input
                                type="text"
                                name="neighborhood"
                                value={formData.neighborhood}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                            />
                            <FormErrors error={errors?.neighborhood?.[0]} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-blue-100/60 ml-1">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                            />
                            <FormErrors error={errors?.city?.[0]} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-blue-100/60 ml-1">Country (ISO)</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-100/30 group-focus-within:text-blue-400 transition-colors">
                                    <Globe size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="country"
                                    maxLength={2}
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                                    placeholder="MX"
                                />
                            </div>
                            <FormErrors error={errors?.country?.[0]} />
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-4 md:col-span-2">
                    <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest border-t border-white/5 pt-4">Property Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-blue-100/60 ml-1">Rooms</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-100/30 group-focus-within:text-blue-400 transition-colors">
                                    <Bed size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="rooms"
                                    value={formData.rooms || ''}
                                    onChange={handleNumberChange}
                                    className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                                />
                            </div>
                            <FormErrors error={errors?.rooms?.[0]} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-blue-100/60 ml-1">Bathrooms</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-100/30 group-focus-within:text-blue-400 transition-colors">
                                    <Bath size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="bathrooms"
                                    value={formData.bathrooms || ''}
                                    onChange={handleNumberChange}
                                    className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                                />
                            </div>
                            <FormErrors error={errors?.bathrooms?.[0]} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-blue-100/60 ml-1">Price (USD)</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-100/30 group-focus-within:text-blue-400 transition-colors">
                                    <DollarSign size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="price"
                                    value={formData.price || ''}
                                    onChange={handleNumberChange}
                                    className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                                />
                            </div>
                            <FormErrors error={errors?.price?.[0]} />
                        </div>
                    </div>
                </div>

                {/* Comments */}
                <div className="space-y-4 md:col-span-2">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-blue-100/60 ml-1">Comments (Optional)</label>
                        <div className="relative group">
                            <div className="absolute top-3 left-3 flex items-center pointer-events-none text-blue-100/30 group-focus-within:text-blue-400 transition-colors">
                                <MessageSquare size={18} />
                            </div>
                            <textarea
                                name="comments"
                                value={formData.comments || ''}
                                onChange={handleChange}
                                rows={3}
                                className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none"
                                placeholder="Any additional information..."
                            />
                            <FormErrors error={errors?.comments?.[0]} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 rounded-2xl text-blue-100 font-bold hover:bg-white/5 transition-all"
                >
                    Cancel
                </button>
                <div className="w-36">
                    <LoadingButton isPending={isPending}>
                        <>
                            <span>{initialData ? 'Update' : 'Add'}</span>
                            <ArrowRight size={18} />
                        </>
                    </LoadingButton>
                </div>
            </div>
        </form>
    );
};

export default PropertyForm;
