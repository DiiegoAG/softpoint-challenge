import {
    Home,
    MapPin,
    Bed,
    Bath,
    Calendar,
    ArrowRight,
    UserCircle,
    Pencil,
    Trash2
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';
import type { Property } from '../properties.types';

interface PropertyCardProps {
    property?: Property;
    isLoading?: boolean;
    onViewDetails?: (property: Property) => void;
    onDelete?: (property: Property) => void;
    onEdit?: (property: Property) => void;
}

const PropertyCard = ({
    property,
    isLoading,
    onViewDetails,
    onDelete,
    onEdit
}: PropertyCardProps) => {
    if (isLoading || !property) {
        return (
            <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-xl overflow-hidden animate-pulse flex flex-col h-full">
                <div className="h-48 w-full bg-white/5" />
                <div className="p-6 flex-1 flex flex-col space-y-4">
                    <div className="space-y-2">
                        <div className="h-6 bg-white/10 rounded-lg w-3/4" />
                        <div className="h-4 bg-white/5 rounded-lg w-1/2" />
                    </div>
                    <div className="py-4 border-y border-white/10 flex justify-between">
                        <div className="h-8 bg-white/10 rounded-lg w-12" />
                        <div className="h-8 bg-white/10 rounded-lg w-12" />
                        <div className="h-8 bg-white/10 rounded-lg w-12" />
                    </div>
                    <div className="mt-auto flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/10" />
                            <div className="h-4 bg-white/10 rounded-lg w-20" />
                        </div>
                        <div className="h-4 bg-white/10 rounded-lg w-16" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            className="group relative backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-xl overflow-hidden hover:border-blue-400/50 transition-all duration-300 flex flex-col h-full"
        >
            {/* Card Header / Image Placeholder */}
            <div className="relative h-48 w-full bg-gradient-to-br from-blue-900/40 to-indigo-900/40 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-110 transition-transform duration-500">
                    <Home size={80} className="text-white" />
                </div>

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg bg-blue-600/80 backdrop-blur-md text-white text-xs font-bold uppercase">
                        {property.real_state_type}
                    </span>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(property);
                        }}
                        className="p-2 rounded-xl bg-red-500/20 backdrop-blur-md text-red-200 hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-lg"
                        title="Delete Property"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1 text-white font-bold text-xl drop-shadow-md">
                        <span>{formatCurrency(property.price)}</span>
                    </div>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                    <h3 className="text-xl cursor-pointer font-bold text-white mb-1 group-hover:text-blue-300 transition-colors" onClick={() => onViewDetails?.(property)}>
                        {property.name}
                    </h3>
                    <div className="flex items-center gap-1 text-blue-100/60 text-sm">
                        <MapPin size={14} />
                        <span className="truncate">{property.full_address || `${property.street}, ${property.neighborhood}, ${property.city}`}</span>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between py-4 border-y border-white/10 mb-4">
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1.5 text-blue-300">
                            <Bed size={16} />
                            <span className="font-bold text-white">{property.rooms}</span>
                        </div>
                        <span className="text-[10px] text-blue-100/40 uppercase font-bold tracking-wider">Rooms</span>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1.5 text-blue-300">
                            <Bath size={16} />
                            <span className="font-bold text-white">{property.bathrooms}</span>
                        </div>
                        <span className="text-[10px] text-blue-100/40 uppercase font-bold tracking-wider">Baths</span>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1.5 text-blue-300">
                            <Calendar size={16} />
                            <span className="font-bold text-white">{new Date(property.created_at).getFullYear()}</span>
                        </div>
                        <span className="text-[10px] text-blue-100/40 uppercase font-bold tracking-wider">Built</span>
                    </div>
                </div>

                {/* Owner & Action */}
                <div className="mt-auto flex items-center justify-between">
                    {property.owner && (
                        <div className="flex items-center gap-2">
                            <UserCircle size={24} className="text-blue-400" />
                            <div className="flex flex-col">
                                <span className="text-[10px] text-blue-100/40 font-bold uppercase tracking-wider leading-none">Owner</span>
                                <span className="text-xs font-semibold text-white">{property.owner.name}</span>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit?.(property);
                            }}
                            className="p-2 cursor-pointer rounded-xl text-blue-400 hover:bg-blue-400/10 transition-all active:scale-90"
                            title="Edit"
                        >
                            <Pencil size={18} />
                        </button>

                        <button
                            onClick={() => onViewDetails?.(property)}
                            className="inline-flex cursor-pointer items-center gap-1 ml-2 text-blue-400 font-bold text-sm hover:text-blue-300 transition-colors"
                        >
                            Details
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
