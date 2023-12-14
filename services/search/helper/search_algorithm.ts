export default function serach_algorithm(query:string){

    let array:(string | undefined)[]=query.split(' ')
   
    array=array?.map(e=>{
        if(e){
            if(e[0]=='آ'){
                const replaced = 'ا' + e.substring(1);
                return '+(>'+e+'*'+' <'+replaced+'*'+')' 
                }
            if(e[0]=='ا'){
                const replaced = 'آ' + e.substring(1);
                return '+(>'+e+'*'+' <'+replaced+'*'+')' 
                }
            return '+'+e+'*'
        }
       })

    return array.join(" ")

}