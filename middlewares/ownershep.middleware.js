import { Subscription } from "../models/Subscription.js";
import { Transaction } from "../models/Transaction.js";


export const verifySubscriptionOwnership  = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if(!subscription) {
            return res.status(404).json({
                success: false,
                message: "subscription not found "
            })
        }

        if(subscription.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied — not your resource"
            })
        }

        next()
    }catch(err) {
        res.status(500).json({ success: false, message: "Server error" })
    }
}

export const verifyTransactionOwnership  = async (req, res, next) => {
    try {
        const subscription = await Transaction.findById(req.params.subscriptionId);

        if(!subscription) {
            return res.status(404).json({
                success: false,
                message: "subscription not found "
            })
        }

        if(subscription.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied — not your resource"
            })
        }

        next()
    }catch(err) {
        res.status(500).json({ success: false, message: "Server error" })
    }
}