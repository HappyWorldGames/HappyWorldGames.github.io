window.onload = function() {
    var url = window.location.href
    if (url.includes("#")) printTextFromPath(url.split("#")[1])
}

async function printTextFromPath(path) {
    if (path == null || path == "") return null
    let response = await fetch('https://happyworldgames.github.io/data/android/data/' + path)

    if (!response.ok) {
        document.getElementById("article").innerHTML = "404"
        return
    }
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
      document.getElementById("article").innerHTML = textToHTML(text)
    };

    reader.onerror = function() {
      alert('Ошибка чтения файла!');
    };

    reader.readAsText(file);
}

function textToHTML(text) {
    var result = text.replaceAll("\n", "<br>")

    while (true) {
        var startIndex = result.indexOf("[")
        var endIndex = result.indexOf(")") + 1

        if (startIndex == -1 || endIndex == 0 || result.indexOf("](") == -1) break
        var subText = result.substring(startIndex, endIndex)

        var urlText = subText.split('[')[1].split(']')[0]
        var url = subText.split('(')[1].split(')')[0]
        if (url.indexOf(" ") != -1) break

        var a = '<a href="' + url + '">' + urlText + '</a>'
        result = result.substring(0, startIndex) + a + result.substring(endIndex)
    }

    return result
}
