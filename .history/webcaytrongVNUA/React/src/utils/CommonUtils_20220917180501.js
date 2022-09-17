class CommonUtils {
    static getBase64(file){
        return new Promise((resolve, reject)=>
        {
            const reader = new FileReader();
            reader.readAsDataUrRL(file);
            reader.onload = () => resolve(reader)
        })
    }
}

export default CommonUtils;