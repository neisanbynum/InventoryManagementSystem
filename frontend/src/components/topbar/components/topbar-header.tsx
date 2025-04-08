import { RootState } from "@/state/main"
import { useSelector } from "react-redux"

export default function TopbarHeader(): React.ReactNode {
	const { authenticated, userName } = useSelector((state: RootState) => state.app)

	if (!authenticated) return <p>Inventory Management System</p>
	return <p>{`${userName?.last}, ${userName?.first} ${userName?.middle}`.trim()}</p>
}