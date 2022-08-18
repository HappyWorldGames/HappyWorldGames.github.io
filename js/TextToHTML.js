var url = window.location.href
if (url.includes("#")) getTextFromPath(url.split("#")[1])

async function getTextFromPath(path) {
    if (path == null || path == "") return null
    let response = await fetch('https://happyworldgames.github.io/data/android/data/' + path)
    let data = await response.blob()
    let metadata = {
        type: 'text/plain'
    }
    let file = new File([data], path, metadata)
    var reader = new FileReader();

    reader.onloadend = function(event) {
      var text = event.target.result,
          blob = new Blob([text], { type: 'text/plain' });
      // Ваши любые манипуляции с данными
      console.log(text);
    };

    reader.onerror = function() {
      alert('Ошибка чтения файла!');
    };

    reader.readAsText(textFile);
}

function textToHTML(text) {
    return text.replaceAll("\n", "<br>")
}
