import SupplierDetails from '../models/SupplierDetails';
import User from '../models/User';

export const SubmitSupplierDetails = async (req, res) => {
    const { userId, supplierDetails } = req.body;
    try {
        const supplierDetailDoc = new SupplierDetails(supplierDetails);
        await supplierDetailDoc.save();
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        user.supplierDetails = supplierDetailDoc._id;
        await user.save();
        
        res.status(201).json({ message: 'Supplier details submitted successfully' });
    } catch (error) {
        console.error('Error submitting supplier details', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const GetAllPendingSuppliers = async (req, res) => {
    try {
        const pendingSuppliers = await User.find({ supplierApproval: 'pending' }).populate('supplierDetails');
        res.json(pendingSuppliers);
    } catch (error) {
        console.log('error happened');
        res.status(500).json({ message: 'Server error' });
    }
};

export const ApproveSupplier = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('supplierDetails');
        if (user) {
            user.supplierApproval = 'accepted';
            await user.save();
            res.json({ message: 'Supplier approved successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log('Error approving supplier', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const RejectSupplier = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            user.supplierApproval = 'rejected';
            await user.save();
            res.json({ message: 'Supplier rejected successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log('Error rejecting supplier', error);
        res.status(500).json({ message: 'Server error' });
    }
};
