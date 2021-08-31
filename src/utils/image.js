import Compress from 'react-image-file-resizer';

export async function compressImage(file) {
	return new Promise((resolve, reject) => {
		Compress.imageFileResizer(
			file, // the file from input
			200, // width
			200, // height
			'JPEG', // compress format WEBP, JPEG, PNG
			70, // quality
			0, // rotation
			(uri) => {
				resolve(uri);
				// You upload logic goes here
			},
			'base64' // blob or base64 default base64
		);
	});
}
