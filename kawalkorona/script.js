function getDataIndo(){
   return fetch("https://api.kawalcorona.com")
    .then(response => {
        if(!response.ok){
            throw new Error(response.statusText);
        }
       return response.json();
    })
    .then(d => {
        return d.filter( dt => {
            if(dt.attributes.Country_Region=="Indonesia"){
                return dt.attributes;
            }
        })[0].attributes;  
    
    });
}

async function async(){
 try {
        const result = await getDataIndo();
        updateUI(result);
        } catch (err) {
        alert(err);
    }
}
async();

function updateUI(d){
    function getLastUpdate(){
        let dateLast = new Date(d.Last_Update);
        const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const getTimeZone = new Date(d.Last_Update).toString();
        const str_a = getTimeZone.indexOf("GMT");
        const timeZone = getTimeZone.slice(str_a, getTimeZone.length);
        const [tahun, bulan2, tanggal, jam, menit, detik] = [
            dateLast.getFullYear(),
            bulan[dateLast.getMonth()],
            dateLast.getDate(),
            dateLast.getHours(),
            dateLast.getMinutes(),
            dateLast.getSeconds()
        ];
        
        dateLast = `${tanggal} ${bulan2} ${tahun} ${jam}:${menit}:${detik} ${timeZone}`;
        return dateLast;
    }
    const lastUpdate = getLastUpdate();
    document.querySelector('.last-update').innerHTML = `Update Terakhir : ${lastUpdate}`; 
    const tampildataCVD19 = tampilData(d);
    document.querySelector('.live-data').innerHTML = tampildataCVD19; 
}



function tampilData(d){ 
    return `
    <div class="col-md-3">
    <div class="card mb-3">
    <div class="card-header bg-danger text-center text-white"><h4>TOTAL POSITIF</h4></div>
    <div class="card-body bg-light">
      <h5 class="card-title text-center h1">${ntSt(d.Confirmed)}</h5>
      <h6 class="text-center">Orang</h6>
    </div>
  </div>
  </div>
  <div class="col-md-3">
  <div class="card mb-3">
    <div class="card-header bg-primary text-center text-white"><h4>TOTAL DIRAWAT</h4></div>
    <div class="card-body bg-light">
      <h5 class="card-title text-center h1">${ntSt(d.Active)}</h5>
      <h6 class="text-center">Orang</h6>
    </div>
  </div>
  </div>
  <div class="col-md-3">
  <div class="card mb-3">
    <div class="card-header bg-success text-center text-white"><h4>TOTAL SEMBUH</h4></div>
    <div class="card-body bg-light">
      <h5 class="card-title text-center h1">${ntSt(d.Recovered)}</h5>
      <h6 class="text-center">Orang</h6>
    </div>
  </div>
  </div>
  <div class="col-md-3">
  <div class="card mb-3">
    <div class="card-header bg-warning text-center text-white"><h4>TOTAL MENINGGAL</h4></div>
    <div class="card-body bg-light">
      <h5 class="card-title text-center h1">${ntSt(d.Deaths)}</h5>
      <h6 class="text-center">Orang</h6>
    </div>
  </div>
  </div>
  `;
}

function ntSt(number){
    var	number_string = number.toString(),
        sisa 	= number_string.length % 3,
        angka 	= number_string.substr(0, sisa),
        ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
            
    if (ribuan) {
        separator = sisa ? ',' : '';
        angka += separator + ribuan.join(',');
    }
    return angka;
    }
