import React, { Component } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';

class ProjectList extends Component {
  state = {
    projects: [
        {
            id: 1,
            title: 'Project A',
            creatorName:'Mamoon Ahmad',
            description: 'An amazing project that will change the world.',
            fundingGoal: 5000,
            currentFunding: 2500,
            imageUrl: 'https://via.placeholder.com/300',
        },
        {
            id: 2,
            title: 'Project B',
            creatorName:'Mamoon Ahmad',
            description: 'An amazing project that will change the world.',
            fundingGoal: 5000,
            currentFunding: 2500,
            imageUrl: 'https://via.placeholder.com/300',
        },
        {
            id: 3,
            title: 'Project C',
            creatorName:'Mamoon Ahmad',
            description: 'An amazing project that will change the world.',
            fundingGoal: 5000,
            currentFunding: 2500,
            imageUrl: 'https://via.placeholder.com/300',
        },
        {
            id: 4,
            title: 'Project D',
            creatorName:'Mamoon Ahmad',
            description: 'An amazing project that will change the world.',
            fundingGoal: 5000,
            currentFunding: 2500,
            imageUrl: 'https://via.placeholder.com/300',
        },
        {
            id: 5,
            title: 'Project E',
            creatorName:'Mamoon Ahmad',
            description: 'An amazing project that will change the world.',
            fundingGoal: 5000,
            currentFunding: 2500,
            imageUrl: 'https://via.placeholder.com/300',
        },
    ]
  };

  render() {
    return (
      <div className="project-list d-flex flex-wrap justify-content-start">
        {this.state.projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            creatorName={project.creatorName}
            description={project.description}
            fundingGoal={project.fundingGoal}
            currentFunding={project.currentFunding}
            imageUrl={project.imageUrl}
          />
        ))}
      </div>
    );
  }
}

export default ProjectList;
