// format angka ke rupiah
const formatRupiah = (angka) => {
	const angka_str = angka.toString();
	const sisa = angka_str.length % 3;
	let rupiah = angka_str.substr(0, sisa);
	let ribuan = angka_str.substr(sisa).match(/\d{3}/g);
	if(ribuan){
		const separate = sisa ? "." : "";
		rupiah += separate + ribuan.join('.');
		return "Rp. "+rupiah;
	}
}
// form eksekusi
function cekIuran(){
		// dom variabel
		const tanggal = document.querySelector("input[name=tgl_bayar]").value;
		const waktu = new Date(tanggal);
		const jmlhorang = document.querySelector("input[name=jmlhorang]").value;
		const jmlhbln = document.querySelector("input[name=jmlbln]").value;
		const uangPangkal = document.querySelector("input[name=uangPangkal]");
		const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
		const td = document.querySelectorAll('td');
		//form validasi
		if(tanggal==''||jmlhorang==''||jmlhbln==''){
			alert('form masih kosong !');
		}else{
		//cek akhir tanggal iuran 
		const waktuAkhir = waktu.getTime() + jmlhbln*30*24*60*60*1000;
		const tahunA = new Date(waktuAkhir).getFullYear();
		const bulanA = bulan[new Date(waktuAkhir).getMonth()];
		const tglA = new Date(waktuAkhir).getDate();
		//cek uangpangkal
		function cekUangPangkal(){
			if(uangPangkal.checked==true){
				uangPangkal.value = 25000
				}else{uangPangkal.value = 0;}
		}
		cekUangPangkal();
		//output
		let jmlh = ((jmlhorang*10000) * jmlhbln) + (jmlhorang*uangPangkal.value);
		td[0].innerHTML = `${waktu.getDate()} ${bulan[waktu.getMonth()]}:${waktu.getMonth()+1} ${waktu.getFullYear()}`;
		td[1].innerHTML = `${tglA} ${bulanA}:${new Date(waktuAkhir).getMonth()+1} ${tahunA}`;
		td[2].innerHTML = `${jmlhbln} Bulan`;
		td[3].innerHTML = `${jmlhorang} Orang`;
		td[4].innerHTML = `${formatRupiah(jmlh)}`;
		}
	}
	function cekUPangkal(){
		const uangPangkalC = document.querySelector("input[name=uangPangkal]");
		if(uangPangkalC.checked==true){
			uangPangkalC.value = 25000;
			uangPangkalC.parentNode.nextSibling.value = `${formatRupiah(uangPangkalC.value)}`;
		}else{
			uangPangkalC.parentNode.nextSibling.value = "";
		}
	}
