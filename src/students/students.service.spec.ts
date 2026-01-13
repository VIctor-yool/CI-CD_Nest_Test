import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import fc from 'fast-check';

describe('StudentsService', () => {
  let service: StudentsService;
  let mockRepo: any;

  //  테스트 하기 전의 세팅 작업
  beforeEach(async () => {
    mockRepo = {
      create: jest.fn(),
      save: jest.fn(),
    };





    const module: TestingModule = await Test.createTestingModule({
      providers: [
        // studentsService를 실제 서비스로 주입
        StudentsService,
        // Student 엔티티의 레포지토리를 mock 객체로 주입
         { useValue: mockRepo, provide: getRepositoryToken(Student) },
        ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('학생 생성 테스트(create)', async () => {
    const createDto = {
      name: '이영철',
      email: 'youn@naver.com',
      age: 27,
    };

    mockRepo.create.mockReturnValue(createDto); // create 함수가 실행되면 createDto를 돌려주도록 설정
    mockRepo.save.mockResolvedValue({ ...createDto, id: 1, isActive: true }); // save 함수가 실행되면 promise 성공 케이스 돌려줌

    const result = await service.create(createDto)

    // 2. repository.create가 createDto를 인자로 호출되었는지 검증
    expect(result).toEqual({ ...createDto, id: 1, isActive: true });
    // 3. repository.save가 createDto를 인자로 호출되었는지 검증
    expect(mockRepo.create).toHaveBeenCalledWith(createDto);
  });

  it('학생 생성 테스트 - 패스트 체크 버전', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 50 }),
          email: fc.emailAddress(),
          age: fc.integer({ min: 1, max: 100 }),
        }),
        async (dto) => {
          mockRepo.create.mockReturnValue(dto); // create 함수가 실행되면 createDto를 돌려주도록 설정
          mockRepo.save.mockResolvedValue({
            ...dto,
            id: fc.integer({ min: 1, max: 10000}),
            isActive: true,
          });
          console.log({ dto });
          const resilt = await service.create(dto);

          expect(resilt).toHaveProperty('id');
          expect(resilt).toHaveProperty('isActive');
          expect(resilt.name).toBe(dto.name);
          expect(resilt.email).toBe(dto.email);
          expect(resilt.age).toBe(dto.age);
          expect(mockRepo.create).toHaveBeenCalledWith(dto);
        }
      )
    )
  })
 
});
