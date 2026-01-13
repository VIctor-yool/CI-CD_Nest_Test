import { Test, TestingModule } from "@nestjs/testing";
import { StudentsController } from "./students.controller";
import { StudentsService } from "./students.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";

describe("StudentsController", () => {
  let controller: StudentsController;
  let mockRepo: any;

  beforeEach(async () => {
    mockRepo = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        // studentsService를 실제 서비스로 주입
        StudentsService,
        // Student 엔티티의 레포지토리를 mock 객체로 주입
        { useValue: mockRepo, provide: getRepositoryToken(Student) },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it("학생 findone get", () => {
    expect(controller.findOne("10")).toBe("학생 10");
  });
});
