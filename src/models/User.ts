import mongoose from 'mongoose';

interface IUser {
    username: string;
    email: string;
    password: string;
    role: 'customer' | 'supplier';
    address?: string;
    phoneNumber?: string;
    joinDate: Date;

}

const userSchema = new mongoose.Schema<IUser>({

  
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['customer', 'supplier'] },
    joinDate: { type: Date, required: true, default: Date.now }, 



    address: {
        type: String,
        required: function (this: IUser) { return this.role === 'supplier'; } // Explicit 'this' typing
    },
    phoneNumber: {
        type: String,
        required: function (this: IUser) { return this.role === 'supplier'; } // Explicit 'this' typing
    }

});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
