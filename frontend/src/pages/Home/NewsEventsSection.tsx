import { Card } from 'react-bootstrap';
import libraryImageOne from '../../assets/library_1_compressed.jpg';
import libraryImageTwo from '../../assets/library_2_compressed.jpg';
import teamImageOne from '../../assets/team_1_compressed.jpg';

const NewsEventsSection = () => {
    return (
        <div className="container mb-3">
            <div className="row">
                <div className="col-12">
                    <h3 className="text-center mb-2">News & Upcoming Events</h3>
                </div>
                <div className="col-12 col-md-4">
                    <Card>
                        <Card.Img variant="top" src={libraryImageOne} />
                        <Card.Body>
                            <Card.Title>Reminder to Students</Card.Title>
                            <Card.Text>
                                We have heard reports of students walking into the restricted section of the library. Entering this section (intentionally or unintentionally) will result in IMMEDIATE expulsion.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-12 col-md-4">
                    <Card>
                        <Card.Img variant="top" src={teamImageOne} />
                        <Card.Body>
                            <Card.Title>Remembering the Dream Team</Card.Title>
                            <Card.Text>
                                The 1993-1994 Gryffindor team is remembered as one of the greatest teams to play the game. This Friday Oliver Wood will be joining us to reflect on some of the teams greatest games.
                                </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-12 col-md-4">
                    <Card>
                        <Card.Img variant="top" src={libraryImageTwo} />
                        <Card.Body>
                            <Card.Title>Poetry Section Update</Card.Title>
                            <Card.Text>
                                As many of you know, the Poetry Section of the library was closed for some repairs. We're happy to announce that as of tomorrow the section will be open again.
                                </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default NewsEventsSection;