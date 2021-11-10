export default function dateToString(date){
    let newDate = new Date(date);
    return (newDate.getFullYear() + "-"+ (newDate.getMonth() +1) +"-"+newDate.getDate());
}