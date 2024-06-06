import mongoose, { Schema, Document } from 'mongoose';
import SupplierDetails, { ISupplierDetails } from './SupplierDetails';

interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    role: 'customer' | 'supplier';
    joinDate: Date;
    supplierApproval?: 'pending' | 'rejected' | 'accepted';
    supplierDetails?: ISupplierDetails | null
}

const userSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['customer', 'supplier'] },
    supplierApproval: {
        type: String,
        enum: ['pending', 'rejected', 'approved'],
        default: 'pending',
    },
    joinDate: { type: Date, required: true, default: Date.now },
    supplierDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SupplierDetails',
        default:null
    },
});

// Pre-save hook to ensure supplier-specific fields are only set for suppliers
userSchema.pre('save', function (next) {
    if (this.role !== 'supplier') {
        this.supplierApproval = undefined;
        this.supplierDetails = undefined;
    }
    next();
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
