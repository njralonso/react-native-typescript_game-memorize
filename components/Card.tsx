import { Pressable, Text, StyleSheet, View } from "react-native"
export default function Card({ onPress, isFlipped, children }) {
	return (
		<Pressable onPress={onPress} style={isFlipped ? styles.cardUp : styles.cardDown}>
			{isFlipped ? <Text style={styles.text}>{children}</Text> : <Text style={styles.text}>?</Text>}
		</Pressable>
	)
}
const styles = StyleSheet.create({
	cardUp: {
		width: 100,
		height: 100,
		margin: 10,
		backgroundColor: '#1E293B',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		borderWidth: 5,
		borderColor: '#000',
	},
	cardDown: {
		width: 100,
		height: 100,
		margin: 10,
		backgroundColor: '#1E293B',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		borderColor: '#000',
		borderWidth: 5
	},
	text: {
		fontSize: 42,
		color: '#334155'
	}
})