class CommonUtils {
    static getBase64(file){
        return new Promise((resolve, reject)=>
        {
            const reader = new FileReader();
            reader.readAsDataUrRL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error
        })
    }
}

export default CommonUtils;