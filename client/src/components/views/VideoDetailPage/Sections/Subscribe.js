import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Subscribe(props) {
	const [SubscribeNumber, setSubscribeNumber] = useState(0);
	const [Subscribed, setSubscribed] = useState(false);

	let subscribedVariable = {
		userTo: props.userTo,
		userFrom: localStorage.getItem('userId'),
	};

	useEffect(() => {
		let variable = { userTo: props.userTo };

		Axios.post('/api/subscribe/subscribeNumber', variable).then(response => {
			if (!response.data.success) {
				('구독자수 정보를 받아오지 못했습니다.');
			} else {
				setSubscribeNumber(response.data.subscribeNumber);
			}
		});

		Axios.post('/api/subscribe/subscribed', subscribedVariable).then(
			response => {
				if (!response.data.success) {
					('정보를 받아오지 못했습니다.');
				} else {
					setSubscribed(response.data.subscribed);
				}
			},
		);
	}, []);

	const onSubscribe = () => {
		if (Subscribed) {
			Axios.post('/api/subscribe/unSubscribe', subscribedVariable).then(
				response => {
					if (!response.data.success) {
						alert('구독을 취소하는데 실패 했습니다.');
					} else {
						setSubscribeNumber(SubscribeNumber - 1);
						setSubscribed(!Subscribed);
					}
				},
			);
		} else {
			Axios.post('/api/subscribe/subscribe', subscribedVariable).then(
				response => {
					if (!response.data.success) {
						alert('구독하는데 실패 했습니다.');
					} else {
						setSubscribeNumber(SubscribeNumber + 1);
						setSubscribed(!Subscribed);
					}
				},
			);
		}
	};

	return (
		<div>
			<button
				onClick={onSubscribe}
				style={{
					backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
					borderRadius: '4px',
					color: 'white',
					padding: '10px 16px',
					fontWeight: '500',
					fontSize: '1rem',
					textTransform: 'uppercase',
				}}
			>
				{SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
			</button>
		</div>
	);
}

export default Subscribe;
