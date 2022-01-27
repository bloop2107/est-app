import React, {useEffect, useState} from 'react';
import { useParams,Link } from 'react-router-dom';
import {api } from '../data/api';
import { Card,Container } from 'react-bootstrap';

const Article = () => {
    let params = useParams(); 
    const [article,setArticle] = useState({});
    
    useEffect(() => {
        api.get(`/blogs/${params.id}`).then(res => {
            setArticle(res.data)
        })
    }, []);

    console.log(article);



  return (
            <Card >
                <Card.Body>
                    <h1>ARTICLE DETAIL</h1>
                    <Link className="text-decoration-none fw-bold" to='/'>Back Home</Link>
                    <Card.Title className="mt-3">
                        {article.title}
                    </Card.Title>
                    <Card.Text className="fs-6">
                        <b><i> Created at:</i></b> {new Date(article.createdAt).toLocaleDateString()}
                    </Card.Text>
                    <Card.Text>
                    {article.content}
                    </Card.Text>
                    <Card.Img 
                        className="rounded d-block w-50" 
                        variant="top" 
                        src={article.image} 
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; 
                            currentTarget.src="https://www.kiettacnghethuat.wp-content/uploads/danh-hoa-leonardo-da-vinci.jpg";
                        }}
                    />
                </Card.Body>
                
            </Card>
    
  );
};

export default Article;
