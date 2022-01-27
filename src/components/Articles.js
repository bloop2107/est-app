import React, { useEffect, useState } from 'react';
import {api} from '../data/api';
import PaginationComponent from './PaginationComponent'
import queryString from 'query-string'
import { Card, Row, Col, Container, Stack } from 'react-bootstrap';
import SearchComponent from './SearchComponent';
import { Link } from 'react-router-dom';
import SortComponent from './SortComponent';

const Articles = () => {

    const [articles, setArticles] = useState([]);
    const [pagination,setPagination] = useState({
        page: 1,
        limit: 10,
        totalRows: 1,
        pageLimit: 5
    });
    const [filters, setFilters] = useState({
        limit: 10,
        page: 1,
        sortBy: 'createdAt',
        order: 'desc'
    })



    useEffect(() => {
        api.get(`/blogs`).then(res => {
            setPagination({
                ...pagination,
                totalRows: res.data.length,
            })
        })
    }, []);

    useEffect(() => {
        const paramsString = queryString.stringify(filters);
        api.get(`/blogs?${paramsString}`).then(res => {
            setArticles(res.data)
        })
    }, [filters]);


    const handlePageChange = (newPage) => {
        setPagination({...pagination, page: newPage})
        setFilters({...filters,page: newPage})
    }

    const onSearchChange = (value) => {
        setFilters({...filters,page:1,title: value})
    }

    const onSortChange = (value) => {
        setFilters({...filters,order: value})
    }


    return (
        <div>
                <Row>
                    <Col xs={4}>
                        <Stack className="p-0">
                            <PaginationComponent pagination={pagination} onPageChange={handlePageChange}/> 
                        </Stack>
                    </Col>
                    <Col xs={8}>
                        <Row>
                            <Col xs={9}>
                                <Stack className="p-0">
                                    <SearchComponent onSearchChange={onSearchChange} />
                                </Stack>
                            </Col>
                            <Col xs={3} className="d-flex align-items-center">
                                <b className="mr-2">Sort: </b>
                                <SortComponent onSortChange={onSortChange} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                
                {
                    articles.map((item,index) => (
                        <Card className="mb-2" key={index}>
                            <Row>
                                <Col xs={3}>
                                    <Card.Img 
                                        variant="top" 
                                        src={item.image} 
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; 
                                            currentTarget.src="https://www.kiettacnghethuat.com/wp-content/uploads/danh-hoa-leonardo-da-vinci.jpg";
                                        }}
                                    />
                                </Col>
                                <Col xs={9}>
                                    <Card.Body>
                                        <Card.Title>
                                            <Link className="text-decoration-none" to={`articles/${item.id}`}>{item.title}</Link>
                                        </Card.Title>
                                        <Card.Text>
                                        {item.content}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Body className="mt-5">
                                        <Card.Text >
                                            <b><i>Created at:</i></b> {new Date(item.createdAt).toLocaleDateString()}
                                        </Card.Text>
                                    </Card.Body>
                                    
                                </Col>
                            </Row>
                        </Card>
                    ))
                }
        </div>
        
    );
};

export default Articles;
