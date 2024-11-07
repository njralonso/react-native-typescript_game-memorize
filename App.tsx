import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Card from './components/Card';

const cards = ["😀", "😂", "😍", "🥳", "😎", "🥑"];

export default function App() {
	const [board, setBoard] = useState(() => shuffle([...cards, ...cards]));
	const [selectedCards, setSelectedCards] = useState<number[]>([]);
	const [matchCards, setMatchCards] = useState<number[]>([]);
	const [score, setScore] = useState(0);

	useEffect(() => {
		if (selectedCards.length < 2) return;
		if (board[selectedCards[0]] === board[selectedCards[1]]) {
			setMatchCards([...matchCards, ...selectedCards]);
			setSelectedCards([]);
		} else {
			const timeoutMemory = setTimeout(() => setSelectedCards([]), 1000);
			return () => clearTimeout(timeoutMemory);
		}
	}, [selectedCards]);

	const flip = (index: number) => {
		if (selectedCards.length === 2 || selectedCards.includes(index)) return;
		setSelectedCards([...selectedCards, index]);
		setScore(score + 1);
	}

	const checkWinner = () => matchCards.length === board.length;

	return (
		<SafeAreaProvider>
			<View style={styles.container}>
				<Text style={{ fontSize: 24 }}>{checkWinner() ? "You WIN" : "Memory Game"}</Text>
				<Text style={{ fontSize: 24 }}>Score: {score}</Text>
				<View style={styles.board}>
					{board.map((card, index: number) => (
						isFlipped = selectedCards.includes(index) || matchCards.includes(index),
						<Card
							isFlipped={isFlipped}
							onPress={() => flip(index)}
							key={index}>{card}
						</Card>)
					)}
				</View>
				<StatusBar style="auto" />
			</View>
		</SafeAreaProvider>
	);
}

function shuffle(array: Array<string>) {
	for (let i = array.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));

		// Swap the elements at i and randomIndex
		[array[i], array[randomIndex]] = [array[randomIndex], array[i]];
	}
	return array;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center', // Centra horizontalmente
		alignItems: 'center',     // Centra verticalmente
	},
	board: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	}
});
