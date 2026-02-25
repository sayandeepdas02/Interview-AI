# Interview AI - Features & User Journey

## Core Features

1. **Authentication & Authorization**
   - Secure login and registration for recruiters using NextAuth.
   - Protected dashboard and job creation routes.

2. **Job Management (Wizard)**
   - Recruiters can create detailed job posts.
   - Support for custom application fields to gather specific candidate data.
   - Ability to attach custom Multiple Choice Question (MCQ) tests to jobs.

3. **Candidate Portal**
   - Public, unique shareable links for each job post.
   - Candidates can view job details without logging in.
   - Seamless application form supporting resume uploads and custom fields.

4. **Timed Assessment / MCQ Tests**
   - Built-in timed MCQ tests for candidates during the application process.
   - Automatic scoring upon submission.

5. **Recruiter Dashboard**
   - Centralized view to track all active and closed job postings.
   - View list of candidates who applied for a specific job.
   - Access candidate details, view their test scores, and download their resumes.

---

## User Journey

### 1. Recruiter Journey
1. **Onboarding**: The recruiter signs up or logs into the platform.
2. **Dashboard Access**: Lands on the Recruiter Dashboard displaying an overview of current jobs.
3. **Job Creation**: 
   - Clicks "Create Job" and goes through a wizard.
   - Enters job details (Title, Description, etc.).
   - Configures custom fields required from applicants.
   - Creates an MCQ test with a specific time limit.
4. **Distribution**: Generates a shareable URL for the created job and distributes it to candidates.
5. **Review**: 
   - Returns to the dashboard to monitor incoming applications.
   - Reviews candidate profiles, custom field responses, and MCQ test scores.
   - Downloads candidate resumes for further shortlisting.

### 2. Candidate Journey
1. **Discovery**: The candidate clicks on the shareable job link provided by the recruiter.
2. **Job Review**: Views the job description and requirements on the public job page.
3. **Application**: 
   - Clicks "Apply".
   - Fills out the application form, entering personal details, custom fields, and uploading a resume.
4. **Assessment**:
   - Agrees to take the attached MCQ test.
   - Completes the test within the allocated time constraint.
5. **Submission**: Submits the application and test. The candidate sees a success message confirming their application has been received.
