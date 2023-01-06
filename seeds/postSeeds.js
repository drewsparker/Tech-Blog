const { Post } = require('../models');

const postData = [
  {
    title: "Introducing our new project management tool",
    post_content: "We are excited to announce the launch of our new project management tool, ProjectHub. This tool allows teams to collaborate and track the progress of their projects in real-time. With features like task assignments, file sharing, and project scheduling, we are confident that ProjectHub will be a valuable asset for any team.",
    user_id: 1
  },
  {
    title: "Tips for improving your coding workflow",
    post_content: "As a developer, it's important to continually find ways to improve your workflow and increase productivity. In this post, we will share some of our top tips for streamlining your coding process. From setting up a comfortable workspace to utilizing code snippets, these small changes can make a big difference in your efficiency.",
    user_id: 2
  },
  {
    title: "The benefits of learning a new programming language",
    post_content: "Learning a new programming language can seem daunting, but it can also be a very rewarding experience. In this post, we will explore some of the benefits of expanding your skillset by learning a new language. From increasing your marketability to improving your problem-solving skills, the advantages of learning a new language are numerous.",
    user_id: 3
  },
  {
    title: "How to get started with cloud computing",
    post_content: "Cloud computing is becoming increasingly popular for both personal and business use. In this post, we will provide a brief overview of what cloud computing is and how it works. We will also offer some tips for getting started with cloud services and choosing the right provider for your needs.",
    user_id: 4
  },
  {
    title: "The future of artificial intelligence",
    post_content: "Artificial intelligence (AI) is a rapidly growing field with endless potential. In this post, we will discuss some of the current applications of AI and speculate on what the future may hold. From self-driving cars to personalized healthcare, the possibilities are endless. We will also explore the ethical considerations surrounding the development and use of AI.",
    user_id: 5
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
