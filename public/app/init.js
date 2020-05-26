fetch('/files')
	.then((res) => {
		if (!res.ok) {
			throw res;
		}
		return res.json();
	})
	.then((files) => {
		renderFilesList(files);
		if (files.length > 0) {
			fetch(`'files/'${files[0]}`)
				.then(res => {
					if (!res.ok) {
						throw res;
					}
					return res.json();
				})
				.then(data => {
					loadFileToEditor(data.name, data.text);
				})
		}
	})
	.catch((err) => console.error(err));

document.getElementById('save-button').addEventListener('click', (e) => {
	const fileNameToSave = e.target.form.fileName.value;
	const fileTextToSave = e.target.form.fileText.value;
	saveFile(fileNameToSave, fileTextToSave);
	e.preventDefault();
});

