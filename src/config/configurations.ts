export default()=>({
    data:{
        url : process.env.MONGO_URL,
        name : process.env.DATABASE_NAME
    }
})