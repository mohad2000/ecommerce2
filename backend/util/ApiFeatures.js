class ApiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            title : {
                $regex : this.queryStr.keyword,
                $options: "i" 
            }
        } : {}

        this.query = this.query.find({...keyword});
        return this
    }

    filter(){
        const queryStrCopy = {...this.queryStr};
        console.log(queryStrCopy);
        const removeItems = ["keyword", "page", "limit"];
        removeItems.forEach(item => delete queryStrCopy[item]);
        console.log(queryStrCopy);
        this.query = this.query.find(queryStrCopy);

        return this

    }

    pagination(){
        const produtsPerPage = 8;
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = produtsPerPage * (currentPage - 1);
        this.query = this.query.limit(produtsPerPage).skip(skip);
        return this

    }
}

export default ApiFeatures