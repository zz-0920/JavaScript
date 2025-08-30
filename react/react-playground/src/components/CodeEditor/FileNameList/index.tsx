import { useContext, useEffect, useState } from 'react'
import { PlaygroundContext } from '../../../ReactPlayground/PlaygroundContext'
import FileNameItem from './FileNameItem'
import styles from './index.module.scss'

export default function FileNameList() {
	const {
		files,
		setFiles,
		selectedFileName,
		setSelectedFileName,
		addFile,
		removeFile,
		updateFileName,
	} = useContext(PlaygroundContext)

	const [tabs, setTabs] = useState<string[]>([])

	const handelEditComplete = (oldName: string, newName: string) => {
		if (oldName === newName) {
			return
		}
		updateFileName(oldName, newName)
		setSelectedFileName(newName)
	}
	const [creating, setCreating] = useState(false)
	const addTab = () => {
		const newFileName = 'Comp' + Math.random().toString().slice(2, 5) + '.tsx'
		addFile(newFileName)
		setSelectedFileName(newFileName)
		setCreating(true)
	}

	useEffect(() => {
		setTabs(Object.keys(files))
	}, [files])
	return (
		<div className={styles.tabs}>
			{tabs.map((tab, index) => (
				<FileNameItem
					key={index}
					value={tab}
					creating={creating && index === tabs.length - 1}
					active={tab === selectedFileName}
					onClick={() => setSelectedFileName(tab)}
					onEditComplete={(newName: string) => handelEditComplete(tab, newName)}
				/>
			))}
			<div className={styles['add']} onClick={addTab}>+</div>
		</div>
	)
}