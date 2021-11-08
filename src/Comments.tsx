import React, { useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { v4 as uuid } from 'uuid';

type CommentProps = {
	comment: any;
};

const useStyles = createUseStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
	},
	button: {
		width: 'fit-content',
		marginTop: '1rem',
	},
	nestedContainer: {
		marginLeft: '2.5rem',
	},
});

const Comment: React.FC<CommentProps> = ({ comment }) => {
	const classes = useStyles();
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const [commentData, setCommentData] = useState(comment);
	const [showNestedComments, setShowNestedComments] = useState(false);

	const replyButtonHandler = () => {
		let newData = JSON.parse(JSON.stringify(commentData));
		if (inputRef?.current?.value) {
			if (commentData.children) {
				newData.children.push({
					_id: uuid(),
					comment: inputRef.current.value,
				});
			} else {
				newData.children = [
					{
						_id: uuid(),
						comment: inputRef.current.value,
					},
				];
			}
			setCommentData(newData);
			inputRef.current.value = '';
		}
	};

	return (
		<div>
			<p>{commentData.comment}</p>
			<div className={classes.container}>
				<textarea ref={inputRef} rows={4} cols={50}></textarea>
				<button className={classes.button} onClick={replyButtonHandler}>
					Reply
				</button>
				{commentData.children && (
					<button
						className={classes.button}
						onClick={() => setShowNestedComments(!showNestedComments)}
					>
						{showNestedComments ? 'Hide' : 'Show'} Comments
					</button>
				)}
				{commentData.children && showNestedComments && (
					<ul className={classes.nestedContainer}>
						<Comments comments={commentData.children} />
					</ul>
				)}
			</div>
		</div>
	);
};

type CommentsProps = {
	comments: any[];
};

export const Comments: React.FC<CommentsProps> = ({ comments }) => {
	return (
		<>
			{comments.map((comment: any) => {
				return (
					<li key={comment._id}>
						<Comment comment={comment} />
					</li>
				);
			})}
		</>
	);
};
