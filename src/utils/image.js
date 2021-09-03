import Compress from 'react-image-file-resizer';

export async function compressImage(file) {
	return new Promise((resolve, reject) => {
		const resizer =
			Compress.imageFileResizer || Compress.default.imageFileResizer;
		try {
			resizer(
				file, // the file from input
				500, // width
				500, // height
				'JPEG', // compress format WEBP, JPEG, PNG
				100, // quality
				0, // rotation
				(uri) => {
					resolve(uri);
					// You upload logic goes here
				},
				'base64' // blob or base64 default base64
			);
		} catch (error) {
			alert(error);
		}
	});
}

export function buildImageSelector() {
	const fileSelector = document.createElement('input');
	fileSelector.setAttribute('type', 'file');
	fileSelector.setAttribute('accept', 'image/*');
	fileSelector.setAttribute('capture', 'user');

	return fileSelector;
}
