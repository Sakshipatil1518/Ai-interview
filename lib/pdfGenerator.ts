import jsPDF from 'jspdf';

export interface ResumeData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    portfolio?: string;
    linkedin?: string;
    github?: string;
  };
  summary: {
    text: string;
  };
  experience: Array<{
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
}

type TemplateId = 'modern' | 'classic' | 'creative' | 'minimal' | 'tech' | 'corporate';

interface TemplateConfig {
  accentR: number;
  accentG: number;
  accentB: number;
  headerBgR: number;
  headerBgG: number;
  headerBgB: number;
  headerTextR: number;
  headerTextG: number;
  headerTextB: number;
  sectionLineWidth: number;
  nameSize: number;
  sectionHeaderSize: number;
  bodySize: number;
  useHeaderBg: boolean;
  sidebarWidth: number;
  useSidebar: boolean;
}

const TEMPLATES: Record<TemplateId, TemplateConfig> = {
  modern: {
    accentR: 37, accentG: 99, accentB: 235,
    headerBgR: 37, headerBgG: 99, headerBgB: 235,
    headerTextR: 255, headerTextG: 255, headerTextB: 255,
    sectionLineWidth: 0.5,
    nameSize: 24, sectionHeaderSize: 13, bodySize: 10,
    useHeaderBg: true, sidebarWidth: 0, useSidebar: false
  },
  classic: {
    accentR: 30, accentG: 30, accentB: 30,
    headerBgR: 255, headerBgG: 255, headerBgB: 255,
    headerTextR: 30, headerTextG: 30, headerTextB: 30,
    sectionLineWidth: 1,
    nameSize: 26, sectionHeaderSize: 12, bodySize: 10,
    useHeaderBg: false, sidebarWidth: 0, useSidebar: false
  },
  creative: {
    accentR: 124, accentG: 58, accentB: 237,
    headerBgR: 124, headerBgG: 58, headerBgB: 237,
    headerTextR: 255, headerTextG: 255, headerTextB: 255,
    sectionLineWidth: 0.5,
    nameSize: 26, sectionHeaderSize: 13, bodySize: 10,
    useHeaderBg: true, sidebarWidth: 55, useSidebar: true
  },
  minimal: {
    accentR: 100, accentG: 100, accentB: 100,
    headerBgR: 255, headerBgG: 255, headerBgB: 255,
    headerTextR: 30, headerTextG: 30, headerTextB: 30,
    sectionLineWidth: 0.3,
    nameSize: 22, sectionHeaderSize: 11, bodySize: 10,
    useHeaderBg: false, sidebarWidth: 0, useSidebar: false
  },
  tech: {
    accentR: 16, accentG: 185, accentB: 129,
    headerBgR: 17, headerBgG: 24, headerBgB: 39,
    headerTextR: 255, headerTextG: 255, headerTextB: 255,
    sectionLineWidth: 0.5,
    nameSize: 24, sectionHeaderSize: 12, bodySize: 10,
    useHeaderBg: true, sidebarWidth: 0, useSidebar: false
  },
  corporate: {
    accentR: 30, accentG: 64, accentB: 175,
    headerBgR: 30, headerBgG: 64, headerBgB: 175,
    headerTextR: 255, headerTextG: 255, headerTextB: 255,
    sectionLineWidth: 0.8,
    nameSize: 24, sectionHeaderSize: 13, bodySize: 10,
    useHeaderBg: true, sidebarWidth: 0, useSidebar: false
  }
};

export class PDFResumeGenerator {
  private doc: jsPDF;
  private yPosition: number;
  private pageWidth: number;
  private margin: number;
  private contentWidth: number;
  private template: TemplateConfig;
  private templateId: TemplateId;

  constructor(templateId: TemplateId = 'modern') {
    this.doc = new jsPDF();
    this.templateId = templateId;
    this.template = TEMPLATES[templateId] || TEMPLATES.modern;
    this.pageWidth = this.doc.internal.pageSize.width;
    this.margin = 20;
    this.yPosition = 20;
    this.contentWidth = this.pageWidth - 2 * this.margin;
  }

  generateResume(data: ResumeData): void {
    if (this.template.useSidebar && this.template.sidebarWidth > 0) {
      this.generateWithSidebar(data);
    } else {
      this.generateStandard(data);
    }
  }

  private generateStandard(data: ResumeData): void {
    this.addHeader(data.personal);
    this.addSummary(data.summary);
    this.addExperience(data.experience);
    this.addEducation(data.education);
    this.addSkills(data.skills);
    this.addProjects(data.projects);
  }

  private generateWithSidebar(data: ResumeData): void {
    const sw = this.template.sidebarWidth;
    const pageH = this.doc.internal.pageSize.height;

    this.doc.setFillColor(this.template.accentR, this.template.accentG, this.template.accentB);
    this.doc.rect(0, 0, sw, pageH, 'F');

    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'bold');

    let sideY = 20;
    const sideMargin = 5;
    const sideWidth = sw - sideMargin * 2;

    const nameLines = this.doc.splitTextToSize(data.personal.fullName, sideWidth);
    this.doc.setFontSize(12);
    this.doc.text(nameLines, sideMargin, sideY);
    sideY += nameLines.length * 6 + 8;

    this.doc.setFontSize(8);
    this.doc.setFont('helvetica', 'normal');
    const contactItems = [
      data.personal.email,
      data.personal.phone,
      data.personal.location,
      data.personal.portfolio || '',
      data.personal.linkedin || '',
      data.personal.github || ''
    ].filter(Boolean);

    contactItems.forEach(item => {
      const lines = this.doc.splitTextToSize(item, sideWidth);
      this.doc.text(lines, sideMargin, sideY);
      sideY += lines.length * 4 + 2;
    });

    sideY += 8;
    this.doc.setFontSize(9);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('SKILLS', sideMargin, sideY);
    sideY += 6;
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(8);
    data.skills.forEach(skill => {
      const lines = this.doc.splitTextToSize(skill, sideWidth);
      this.doc.text(lines, sideMargin, sideY);
      sideY += 5;
    });

    this.margin = sw + 10;
    this.contentWidth = this.pageWidth - this.margin - 10;
    this.yPosition = 20;

    this.doc.setTextColor(30, 30, 30);
    this.addSummary(data.summary);
    this.addExperience(data.experience);
    this.addEducation(data.education);
    this.addProjects(data.projects);
  }

  private addHeader(personal: ResumeData['personal']): void {
    const t = this.template;

    if (t.useHeaderBg) {
      const headerH = personal.portfolio || personal.linkedin ? 38 : 32;
      this.doc.setFillColor(t.headerBgR, t.headerBgG, t.headerBgB);
      this.doc.rect(0, 0, this.pageWidth, headerH, 'F');
      this.doc.setTextColor(t.headerTextR, t.headerTextG, t.headerTextB);
    } else {
      this.doc.setTextColor(t.accentR, t.accentG, t.accentB);
    }

    this.doc.setFontSize(t.nameSize);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(personal.fullName, this.margin, this.yPosition);
    this.yPosition += 10;

    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');

    const contactInfo = [personal.email, personal.phone, personal.location].filter(Boolean);
    this.doc.text(contactInfo.join(' | '), this.margin, this.yPosition);
    this.yPosition += 6;

    if (personal.portfolio || personal.linkedin || personal.github) {
      const links = [personal.portfolio, personal.linkedin, personal.github].filter(Boolean) as string[];
      const linkLine = this.doc.splitTextToSize(links.join(' | '), this.contentWidth);
      this.doc.text(linkLine, this.margin, this.yPosition);
      this.yPosition += 6;
    }

    if (t.useHeaderBg) {
      this.yPosition += 6;
      this.doc.setTextColor(30, 30, 30);
    } else {
      this.yPosition += 4;
      this.doc.setTextColor(30, 30, 30);
      this.doc.setDrawColor(t.accentR, t.accentG, t.accentB);
      this.doc.setLineWidth(t.sectionLineWidth);
      this.doc.line(this.margin, this.yPosition, this.pageWidth - this.margin, this.yPosition);
      this.yPosition += 8;
    }
  }

  private addSummary(summary: ResumeData['summary']): void {
    this.addSectionHeader('PROFESSIONAL SUMMARY');
    this.doc.setFontSize(this.template.bodySize);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(60, 60, 60);
    const lines = this.doc.splitTextToSize(summary.text, this.contentWidth);
    this.doc.text(lines, this.margin, this.yPosition);
    this.yPosition += lines.length * 4 + 8;
    this.doc.setTextColor(30, 30, 30);
  }

  private addExperience(experience: ResumeData['experience']): void {
    this.addSectionHeader('WORK EXPERIENCE');

    experience.forEach((job) => {
      this.checkPageBreak(30);

      this.doc.setFontSize(11);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setTextColor(this.template.accentR, this.template.accentG, this.template.accentB);
      this.doc.text(job.position, this.margin, this.yPosition);

      this.doc.setTextColor(60, 60, 60);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setFontSize(10);
      const dateRange = `${this.formatDate(job.startDate)} - ${job.endDate === 'Present' ? 'Present' : this.formatDate(job.endDate)}`;
      const dateWidth = this.doc.getTextWidth(dateRange);
      this.doc.text(dateRange, this.pageWidth - this.margin - dateWidth, this.yPosition);
      this.yPosition += 5;

      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'italic');
      this.doc.setTextColor(80, 80, 80);
      this.doc.text(`${job.company} | ${job.location}`, this.margin, this.yPosition);
      this.yPosition += 6;

      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(60, 60, 60);
      const descLines = this.doc.splitTextToSize(job.description, this.contentWidth);
      this.doc.text(descLines, this.margin, this.yPosition);
      this.yPosition += descLines.length * 4 + 8;
    });
  }

  private addEducation(education: ResumeData['education']): void {
    this.addSectionHeader('EDUCATION');

    education.forEach((edu) => {
      this.checkPageBreak(20);

      this.doc.setFontSize(11);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setTextColor(this.template.accentR, this.template.accentG, this.template.accentB);
      this.doc.text(edu.school, this.margin, this.yPosition);

      const dateRange = `${this.formatDate(edu.startDate)} - ${this.formatDate(edu.endDate)}`;
      const dateWidth = this.doc.getTextWidth(dateRange);
      this.doc.setTextColor(60, 60, 60);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setFontSize(10);
      this.doc.text(dateRange, this.pageWidth - this.margin - dateWidth, this.yPosition);
      this.yPosition += 5;

      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(60, 60, 60);
      this.doc.text(edu.degree, this.margin, this.yPosition);
      this.yPosition += 5;

      if (edu.gpa) {
        this.doc.setFont('helvetica', 'italic');
        this.doc.text(`GPA: ${edu.gpa}`, this.margin, this.yPosition);
        this.yPosition += 5;
      }

      this.yPosition += 5;
    });
  }

  private addSkills(skills: string[]): void {
    this.addSectionHeader('TECHNICAL SKILLS');
    this.doc.setFontSize(this.template.bodySize);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(60, 60, 60);
    const skillsText = skills.join(' • ');
    const skillsLines = this.doc.splitTextToSize(skillsText, this.contentWidth);
    this.doc.text(skillsLines, this.margin, this.yPosition);
    this.yPosition += skillsLines.length * 4 + 10;
    this.doc.setTextColor(30, 30, 30);
  }

  private addProjects(projects: ResumeData['projects']): void {
    this.addSectionHeader('PROJECTS');

    projects.forEach((project) => {
      this.checkPageBreak(25);

      this.doc.setFontSize(11);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setTextColor(this.template.accentR, this.template.accentG, this.template.accentB);
      this.doc.text(project.name, this.margin, this.yPosition);
      this.yPosition += 5;

      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'italic');
      this.doc.setTextColor(80, 80, 80);
      const techText = `Technologies: ${project.technologies.join(', ')}`;
      this.doc.text(techText, this.margin, this.yPosition);
      this.yPosition += 5;

      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(60, 60, 60);
      const descLines = this.doc.splitTextToSize(project.description, this.contentWidth);
      this.doc.text(descLines, this.margin, this.yPosition);
      this.yPosition += descLines.length * 4;

      if (project.link) {
        this.doc.setFont('helvetica', 'italic');
        this.doc.setTextColor(this.template.accentR, this.template.accentG, this.template.accentB);
        this.doc.text(`Link: ${project.link}`, this.margin, this.yPosition);
        this.yPosition += 5;
      }

      this.yPosition += 5;
    });
  }

  private addSectionHeader(title: string): void {
    this.checkPageBreak(15);
    const t = this.template;

    this.doc.setFontSize(t.sectionHeaderSize);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(t.accentR, t.accentG, t.accentB);
    this.doc.text(title, this.margin, this.yPosition);
    this.yPosition += 5;

    this.doc.setDrawColor(t.accentR, t.accentG, t.accentB);
    this.doc.setLineWidth(t.sectionLineWidth);
    this.doc.line(this.margin, this.yPosition, this.pageWidth - this.margin, this.yPosition);
    this.yPosition += 6;

    this.doc.setTextColor(30, 30, 30);
  }

  private checkPageBreak(requiredSpace: number): void {
    if (this.yPosition + requiredSpace > this.doc.internal.pageSize.height - 20) {
      this.doc.addPage();
      this.yPosition = 20;

      if (this.template.useSidebar && this.template.sidebarWidth > 0) {
        const sw = this.template.sidebarWidth;
        const pageH = this.doc.internal.pageSize.height;
        this.doc.setFillColor(this.template.accentR, this.template.accentG, this.template.accentB);
        this.doc.rect(0, 0, sw, pageH, 'F');
      }
    }
  }

  private formatDate(dateString: string): string {
    if (!dateString) return '';
    try {
      const date = new Date(dateString + '-01');
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch {
      return dateString;
    }
  }

  download(filename: string): void {
    this.doc.save(filename);
  }

  getBlob(): Blob {
    return this.doc.output('blob');
  }

  getBase64(): string {
    return this.doc.output('datauristring');
  }
}

export const generateResumePDF = (data: ResumeData, filename: string = 'resume.pdf', templateId: TemplateId = 'modern'): void => {
  const generator = new PDFResumeGenerator(templateId);
  generator.generateResume(data);
  generator.download(filename);
};
