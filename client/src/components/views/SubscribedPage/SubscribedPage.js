import React, { useEffect, useState } from 'react';
import { Typography, Card, Row, Col, Avatar } from 'antd';
const { Title } = Typography;
const { Meta } = Card;
import Axios from 'axios';
import moment from 'moment';

function SubscribedPage() {
	const [Video, setVideo] = useState([]);

	useEffect(() => {
		const subscribedVariables = {
			userFrom: localStorage.getItem('userId'),
		};

		Axios.post('/api/video/getSubscribedVideo', subscribedVariables).then(
			response => {
				if (!response.data.success) {
					alert('비디오를 가져오는데 실패했습니다.');
				} else {
					setVideo(response.data.videos);
				}
			},
		);
	}, []);

	const renderCards = Video.map((video, index) => {
		let minutes = Math.floor(video.duration / 60);
		let seconds = Math.floor(video.duration - minutes * 60);
		if (seconds < 10) seconds = '0' + seconds;

		return (
			<Col key={index} lg={6} md={8} xs={24}>
				<div style={{ position: 'relative' }}>
					<a href={`/video/${video._id}`}>
						<img
							style={{ width: '100%' }}
							alt="thumbnail"
							src={`http://localhost:5000/${video.thumbnail}`}
						/>
						<div
							className=" duration"
							style={{
								bottom: 0,
								right: 0,
								position: 'absolute',
								margin: '4px',
								color: '#fff',
								backgroundColor: 'rgba(17, 17, 17, 0.8)',
								opacity: 0.8,
								padding: '2px 4px',
								borderRadius: '2px',
								letterSpacing: '0.5px',
								fontSize: '12px',
								fontWeight: '500',
								lineHeight: '12px',
							}}
						>
							<span>
								{minutes} : {seconds}
							</span>
						</div>
					</a>
				</div>
				<br />
				<Meta
					avatar={<Avatar src={video.writer.image} />}
					title={video.title}
				/>
				<span>{video.writer.name} </span>
				<br />
				<span style={{ marginLeft: '3rem' }}> {video.views}</span>-{' '}
				<span> {moment(video.createdAt).format('MMM Do YY')} </span>
			</Col>
		);
	});

	return (
		<div style={{ width: '85%', margin: '3rem auto' }}>
			<Title level={2}> Recommended </Title>
			<hr />
			<Row gutter={[32, 16]}>{renderCards}</Row>
		</div>
	);
}

export default SubscribedPage;
