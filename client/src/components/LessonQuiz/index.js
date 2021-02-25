import { Link, useParams } from 'react-router-dom';

import Quiz from 'react-quiz-component';
import React from 'react';
import { SAVE_GRADE } from '../../utils/mutations';
import { art } from '../../quizzes/art';
import { english } from '../../quizzes/english';
import { geography } from '../../quizzes/geography';
import { history } from '../../quizzes/history';
import { mathematics } from '../../quizzes/math';
import { science } from '../../quizzes/science';
import { space } from '../../quizzes/space';
import { useMutation } from '@apollo/react-hooks';
import { webDevelopment } from '../../quizzes/webDev';

function LessonQuiz() {

    const [saveGrade] = useMutation(SAVE_GRADE);

    const { quizName } = useParams();
    console.log(quizName);

    const displayQuiz = () => {
        switch (quizName) {
            case 'science':
                return science;
            case 'space':
                return space;
            case 'history':
                return history;
            case 'mathematics':
                return mathematics;
            case 'web development':
                return webDevelopment;
            case 'english':
                return english;
            case 'art':
                return art;
            case 'geography':
                return geography;
            default:
                return <div>Quiz not found...</div>;
        }
    };

    const onCompleteAction = async (results) => {
        const score = Math.round((results.numberOfCorrectAnswers / results.numberOfQuestions) * 100);
        console.log(results);
        console.log(score);

        try {
            await saveGrade({
                variables: { lessonName: quizName, grade: score }
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section className='py-2'>
            <Quiz
                shuffle={true}
                quiz={displayQuiz()}
                onComplete={onCompleteAction}
            />
            <div className='flex-row mx-2 px-2 py-2 space-between'>
                <Link to="/courses" className="back-course "><button className='btn'>&#8592; Go back to course list </button></Link>
            </div>
        </section>
    );
}

export default LessonQuiz;