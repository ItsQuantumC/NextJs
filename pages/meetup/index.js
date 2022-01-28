import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import Head from 'next/head';


function NewMeetup() {

    const router = useRouter();
    async function addMeetUpHandler(meetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data)
        router.push('/')
    }
    return <>
        <Head>
            <title>Add a new Meetup</title>
            <meta name="description" content="Go on add some" />
        </Head>
        <NewMeetupForm onAddMeetup={addMeetUpHandler}/>
    </>
}


export default NewMeetup;