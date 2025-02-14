# 📋 Josiah's Storage Management and File Sharing Platform

## Table of Contents
- 🤖 [Introduction](#introduction)
- ⚙️ [Tech Stack](#tech-stack)
- 🔋 [Features](#features)
- 🤸 [Quick Start](#quick-start)

## 🤖 Introduction
A storage management and file sharing platform that lets users effortlessly upload, organize, and share files. Built with the latest Next.js 15 and the Appwrite Node SDK, utilizing advanced features for seamless file management.

If you're getting started and need assistance or face any bugs, join our active Discord community with over 34k+ members. It's a place where people help each other out.

## ⚙️ Tech Stack
- **React 19**
- **Next.js 15**
- **Appwrite**
- **TailwindCSS**
- **ShadCN**
- **TypeScript**

## 🔋 Features
- **User Authentication with Appwrite**: Implement signup, login, and logout functionality using Appwrite's authentication system.
- **File Uploads**: Effortlessly upload a variety of file types, including documents, images, videos, and audio, ensuring all your important data.
- **View and Manage Files**: Users can browse through their uploaded files stored in Appwrite storage, view on a new tab, rename file or delete.
- **Download Files**: Users can download their uploaded files giving them instant access to essential documents.
- **File Sharing**: Users can easily share their uploaded files with others, enabling collaboration and easy access to important content.
- **Dashboard**: Gain insights at a glance with a dynamic dashboard that showcases total and consumed storage, recent uploads, and a summary of files grouped by type.
- **Global Search**: Users can quickly find files and shared content across the platform with a robust global search feature.
- **Sorting Options**: Organize files efficiently by sorting them by date, name, or size, making file management a breeze.
- **Modern Responsive Design**: A fresh and minimalist UI that emphasizes usability, ensuring a clean aesthetic across all devices.
- **And many more**: Including the latest React 19, Next.js 15, and Appwrite features alongside code architecture and reusability.

## 🤸 Quick Start
Follow these steps to set up the project locally on your machine.

### Prerequisites
Make sure you have the following installed on your machine:
- **Git**
- **Node.js**
- **npm** (Node Package Manager)

### Cloning the Repository
```bash
git clone https://github.com/JosiahAgency/storage-drive.git
cd storage_management_solution
```

### Installation
Install the project dependencies using npm:
```bash
npm install
```

### Set Up Environment Variables
Create a new file named `.env.local` in the root of your project and add the following content:
```plaintext
NEXT_PUBLIC_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
NEXT_PUBLIC_APPWRITE_PROJECT=""
NEXT_PUBLIC_APPWRITE_DATABASE=""
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=""
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=""
NEXT_PUBLIC_APPWRITE_BUCKET=""
NEXT_APPWRITE_KEY=""
```
Replace the values with your actual Appwrite credentials. You can obtain these credentials by signing up & creating a new project on the Appwrite website.

### Running the Project
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
