import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function SideVideo() {
	const [SideVideos, setSideVideos] = useState([]);

	useEffect(() => {
		Axios.get('/api/video/getVideo').then(response => {
			if (!response.data.success) {
				alert('비디오를 가져오는데 실패했습니다.');
			} else {
				setSideVideos(response.data.videos);
			}
		});
	}, []);

	const renderSideVideo = SideVideos.map((video, index) => {
		let minutes = Math.floor(video.duration / 60);
		let seconds = Math.floor(video.duration - minutes * 60);
		if (seconds < 10) seconds = '0' + seconds;

		return (
			<div
				key={index}
				style={{ display: 'flex', marginBottom: '1rem', padding: '0 2rem' }}
			>
				<div style={{ width: '40%', marginRight: '1rem' }}>
					<a href={`/video/${video._id}`}>
						<img
							style={{ width: '100%', height: '100%' }}
							src={`http://localhost:5000/${video.thumbnail}`}
							alt="thumbnail"
						/>
					</a>
				</div>

				<div style={{ width: '50%' }}>
					<a href={`/video/${video._id}`} style={{ color: 'gray' }}>
						<span style={{ fontSize: '1rem', color: 'black' }}>
							{video.title}
						</span>
						<br />
						<span>{video.writer.name}</span>
						<br />
						<span>{video.views} views</span>
						<br />
						<span>
							{minutes} : {seconds}
						</span>
					</a>
				</div>
			</div>
		);
	});

	return (
		<React.Fragment>
			<div style={{ marginTop: '3rem' }} />
			{renderSideVideo}
		</React.Fragment>
	);
}

export default SideVideo;
