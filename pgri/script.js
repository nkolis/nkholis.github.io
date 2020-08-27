function cekIuran(){
		// variabel&value
		const tanggal = document.querySelector("input[name=tgl_bayar]").value;
		const waktu = new Date(tanggal);
		const jmlhorang = document.querySelector("input[name=jmlhorang]").value;
		const jmlhbln = document.querySelector("input[name=jmlbln]").value;
		const uangPangkal = document.querySelector("input[name=uangPangkal]");
		const tampil = document.querySelector(".hasil p");
		const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
		const td = document.querySelectorAll('td');
		//eksekusi

		//form validasi
		if(tanggal==''||jmlhorang==''||jmlhbln==''){
			alert('form masih ada yang kosong');
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
		td[0].innerHTML = `${waktu.getDate()} ${bulan[waktu.getMonth()]} ${waktu.getFullYear()}`;
		td[1].innerHTML = `${tglA} ${bulanA} ${tahunA}`;
		td[2].innerHTML = `${jmlhbln}`;
		td[3].innerHTML = `${jmlhorang}`;
		td[4].innerHTML = `${jmlh}`;
		}
	}
	function pesan(){
		const uangPangkalC = document.querySelector("input[name=uangPangkal]");
		if(uangPangkalC.checked==true){
			uangPangkalC.value = 25000;
			uangPangkalC.parentNode.nextSibling.value = `Rp. ${uangPangkalC.value}`;
		}else{
			uangPangkalC.parentNode.nextSibling.value = "";
		}
	}
