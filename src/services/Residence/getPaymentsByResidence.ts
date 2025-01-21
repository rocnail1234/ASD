import { Prisma } from "@prisma/client";
import {  GetPaymentByResidence } from "../../types/Residence";
import { prisma } from "../../db/prisma";




export const getPaymentsByResidence = async ( data:GetPaymentByResidence) => {
    const {id,limit,page,from,to} = data
    
    const query: Prisma.PaymentFindManyArgs = {
        where:{
           AND: [
            {registerDate: {gte: from}},
            {registerDate: {lte: to}}
           ],
           whoPay: id
        },
        skip: (page - 1 ) * limit,
        take: limit,
         include:{
            Expense:{
                orderBy:{
                    createdAt:"desc"
                }
            },
            Account: {
                select:{
                    accountNumber:true,
                    title:true
                }
            }
         },
         orderBy:{
            createdAt: "desc"
         }
        }
        console.log(query)

    try {
       return await prisma.payment.findMany(query)
    } catch (error) {
        throw error
    }
}