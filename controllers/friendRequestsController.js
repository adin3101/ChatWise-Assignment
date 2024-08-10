import friendRequests from "../models/friendRequests.js";
import User from "../models/User.js";

export const sendFriendRequest = async(req,res)=>{
    try {
        const {fromUserId, toUserId}=req.body;

        const friendrequest = new friendRequests({
            fromUser: fromUserId,
            toUser: toUserId,
            status: 'pending'
          });
          await friendrequest.save();
          res.status(201).json({ message: 'Friend request sent successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const acceptFriendRequest = async (req, res) => {
    try {
      const { requestId } = req.body; 
  
      await friendRequests.findByIdAndUpdate(requestId, { status: 'accepted' });
  
      const friendrequest = await friendRequests.findById(requestId);
      const { fromUser, toUser } = friendrequest;
  
      await User.findByIdAndUpdate(fromUser, { $addToSet: { friends: toUser } });
      await User.findByIdAndUpdate(toUser, { $addToSet: { friends: fromUser } });
  
      res.status(200).json({ message: 'Friend request accepted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


export const getFriendRequest = async (req,res)=>{
    try {
        const userId = req.params.userId;
        const friendRequest = await friendRequests.find({
            $or: [{ fromUser: userId }, { toUser: userId }]}).populate('fromUser').populate('toUser');
            res.status(200).json(friendRequest);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const rejectFriendRequest= async(req,res)=>{
    try {
        const { requestId } = req.body;
        await friendRequests.findByIdAndUpdate(requestId, { status: 'rejected' });

        res.status(200).json({ message: 'Friend request rejected' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
