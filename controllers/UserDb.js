import User from "../db/UserModel.js";

export const pageNated= async(req,res)=>{
    try {
        const limit=Number(req.query.limit)||0
        const page=Number(req.query.page)||0
        const skip= (page-1)*limit
        
        const result = await User.aggregate([
            {
                $facet:{
                    data:[
                        {$skip:skip},
                        {$limit:limit},
                        {$project:{password:0}}
                    ],
                totalCount:[{$count:"count"}]
                }
            }
        ])
        res.status(200).json({page,limit,totalUsers:result[0].totalCount[0]?.count||0,
            users: result[0].data
        })
    } catch (error) {
     res.status(500).json({msg:"internal server error",error})   
    }
}