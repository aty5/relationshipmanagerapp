import {Component, OnInit} from '@angular/core';
import {Relationship} from "./relationship";
import {RelationshipService} from "./relationship.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public relationships: Relationship[] = [];
  public editRelationship: Relationship | null= null;
  public deleteRelationship: Relationship | null= null;
  constructor(private relationshipService: RelationshipService) {}

  ngOnInit() {
    this.getRelationships();
  }

  public getRelationships(): void {
    this.relationshipService.getRelationships().subscribe(
      (response: Relationship[]) =>{
        this.relationships = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }

  public onAddRelationship(addForm: NgForm): void {
    const addRelationshipForm = document.getElementById('add-relationship-form');
    if (addRelationshipForm) {
      addRelationshipForm.click();
    }
    this.relationshipService.addRelationship(addForm.value).subscribe(
      (response: Relationship) => {
        console.log(response);
        this.getRelationships();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateRelationship(relationship: Relationship): void {
    this.relationshipService.updateRelationship(relationship).subscribe(
      (response: Relationship) => {
        console.log(response);
        this.getRelationships();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteRelationship(relationshipId: number): void {
    this.relationshipService.deleteRelationship(relationshipId).subscribe(
      (response: void) => {
        console.log(response);
        this.getRelationships();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchRelationships(key: string): void {
    console.log(key);
    const results: Relationship[] = [];
    for (const relationship of this.relationships) {
      if (relationship.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || relationship.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || relationship.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || relationship.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(relationship);
      }
    }
    this.relationships = results;
    if (results.length === 0 || !key) {
      this.getRelationships();
    }
  }


  public onOpenModal(relationship: Relationship | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addRelationshipModal');
    }
    if (mode === 'edit') {
      this.editRelationship = relationship;
      button.setAttribute('data-target', '#updateRelationshipModal');
    }
    if (mode === 'delete') {
      this.deleteRelationship = relationship;
      button.setAttribute('data-target', '#deleteRelationshipModal');
    }
    if (container) {
      container.appendChild(button);
    }
    button.click();
  }
}
