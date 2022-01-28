import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head'

function HomePage (props) {
return <>
    <Head>
        <title>Meetups</title>
        <meta name="description" content="Lots of meetups to explore"/>
    </Head>
    <MeetupList meetups={props.message}/>
</>
}

/*export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;
    return {
        props: {
            message: DUMMY_MEETUPS
        },
    }
}*/

export async function getStaticProps() {
    // fetch data from API
    const client = await MongoClient.connect('mongodb+srv://omkar:quantum@cluster0.8l72d.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    client.close();
    
    return {
        props: {
            message: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))

        },
        revalidate: 10
    }
}

export default HomePage;