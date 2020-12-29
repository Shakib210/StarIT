function starit(i) {
    if(i<10){
        i++;
        console.log("Star It Ltd.")
        starit(i);
    }
}
starit(0);