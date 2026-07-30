async function cekAPI() {

    try {

        const res = await fetch("/api");

        const data = await res.json();

        alert(data.message);

    } catch (err) {

        alert("API tidak dapat dihubungi.");

    }

}

async function uploadFile() {

    const file = document.getElementById("file").files[0];

    if (!file) {
        alert("Pilih file terlebih dahulu.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    document.getElementById("status").innerHTML = "⏳ Mengupload...";

    try {

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        if (data.success) {

            document.getElementById("status").innerHTML =
                "✅ Upload berhasil!<br><br>File ID:<br>" + data.fileId;

        } else {

            document.getElementById("status").innerHTML =
                "❌ " + (data.message || data.error);

        }

    } catch (err) {

        document.getElementById("status").innerHTML =
            "❌ Gagal terhubung ke server.";

    }

}
