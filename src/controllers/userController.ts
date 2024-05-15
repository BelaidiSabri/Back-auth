import User from "../models/User";

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const updates = req.body; // Data from client
        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};