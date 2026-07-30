async function cekAPI(){

    const res = await fetch("/api");

    const data = await res.json();

    alert(data.message);

}
