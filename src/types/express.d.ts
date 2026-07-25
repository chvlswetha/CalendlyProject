//declaring global variable Userid
//And adding this variable to Exress namesapce,
// This UserId acts a property for Rrequest object

declare global{
    namespace Express{
        interface Request{
            userId: number;
        }
    }
}
export{};