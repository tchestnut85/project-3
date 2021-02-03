import React, { useEffect } from 'react';

import { QUERY_LESSON } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

function Lesson() {
    const { id: lessonId } = useParams();
    console.log(lessonId);

    const { loading, data } = useQuery(QUERY_LESSON, {
        variables: { id: lessonId }
    });

    const lesson = data?.lesson || {};
    console.log('lesson:', lesson);

    useEffect(() => {
        if (data) {
            data.products.forEach((lesson) => {
                idbPromise('lessons', 'put', lesson);
            });
        }
        // } else if (!loading) {
        //     idbPromise('lessons', 'get').then((lessons) => {

        //     });
        // }
    }, [data, loading]);

    if (loading) {
        return <div>Loading Lesson...</div>;
    }

    return (
        <section className='lesson'>
            <h2 className="lesson-title">Introduction to {lesson.name}</h2>
            <div>
                <p className="lesson-intro">
                    {lesson.intro}
                </p>

                <h3 className="lesson-name">
                    {lesson.name} 101
                </h3>

                <img
                    src={lesson.image}
                    alt={lesson.name}
                    className='lesson-img'
                />

                <article className="lesson-content">
                    {lesson.content}
                </article>

            </div>
        </section>
    );
}

export default Lesson;