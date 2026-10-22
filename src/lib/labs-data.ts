// AUTO-GENERATED from AtomLearn lab docs exports (Data Warehousing.json / Data Engineering.json)
// Do not edit by hand — run scripts/convert-labs.py to regenerate.

export interface LabStepBlock {
  type: string;
  id?: string | null;
  lang?: string;
  code?: string;
  label?: string | null;
  url?: string | null;
  caption?: string | null;
  html?: string | null;
}

export interface LabStep {
  title: string | null;
  description: string | null;
  code: string | null;
  codeLang: string | null;
  image: string | null;
  imageCaption: string | null;
  blocks: LabStepBlock[];
}

export interface FlowNodeDef {
  id: string;
  label: string;
  type: string; // start | process | decision | end
}

export interface LabModule {
  title: string | null;
  overview: string | null;
  explanation: string | null;
  output: string | null;
  outputCode: string | null;
  flow: FlowNodeDef[] | null;
  steps: LabStep[];
}

export interface Lab {
  title: string | null;
  order: number;
  linkUrl: string | null;
  modules: LabModule[];
}

export interface LabCourse {
  title: string | null;
  groupName: string;
  color: string;
  labs: Lab[];
}

export const LAB_COURSES: LabCourse[] = [
 {
  "title": "Data WareHousing",
  "groupName": "SnowFlake",
  "color": "#0284c7",
  "labs": [
   {
    "title": "DORA Setup & LAB Initialisation",
    "order": 0,
    "linkUrl": "https://learn.snowflake.com/en/courses/OD-ESS-DWW/",
    "modules": [
     {
      "title": "DB's Creation",
      "overview": "<p>In this lab, you will:</p><ol><li><p>Access your Snowflake Trial account.</p></li><li><p>Navigate to <strong>Catalog → Database Explorer</strong>.</p></li><li><p>Create a new database such as <code>DEMO_DB</code>.</p></li><li><p>View the schemas created inside the database.</p></li><li><p>Explore the objects available within each schema.</p></li><li><p>Transfer ownership of the database to the <code>SYSADMIN</code> role.</p></li><li><p>Switch the active system role back to <code>SYSADMIN</code>.</p></li></ol>",
      "explanation": "<p><span>When you activated your account it would have opened your trial in a new browser tab, but just in case you closed that tab or lost track of it, remember you can always go back to your email inbox and find an email that will give you the link to your Snowflake Trial account.</span></p><p>This lab guides learners through the initial Snowflake database setup required for the Data Warehousing DORA exercises. Learners create a new database, examine its automatically generated schemas, transfer database ownership to the <code>SYSADMIN</code> role,</p><p>and finally switch their active role from <code>ACCOUNTADMIN</code> to <code>SYSADMIN</code>. This setup ensures that the database is properly organized and managed using Snowflake’s recommended role-based access structure.</p>",
      "output": "<p>A new Snowflake database is successfully created and displayed in <strong>Database Explorer</strong>. The database contains its default schemas, and its ownership is transferred from <code>ACCOUNTADMIN</code> to <code>SYSADMIN</code>. The active system role is then changed to <code>SYSADMIN</code>, allowing the learner to explore and manage the newly created database during the upcoming lab activities.</p>",
      "outputCode": null,
      "flow": [
       {
        "id": "f236d84e64",
        "label": "Open Catalog",
        "type": "start"
       },
       {
        "id": "2af8d20e26",
        "label": "Goto Database Explorer",
        "type": "process"
       },
       {
        "id": "820f306b89",
        "label": "Create DataBase \"DEMO_DB\"",
        "type": "process"
       },
       {
        "id": "80084023c7",
        "label": "View SCHEMAS",
        "type": "decision"
       },
       {
        "id": "7f6e2caba4",
        "label": "Transfer Ownership",
        "type": "process"
       },
       {
        "id": "63b116dda3",
        "label": "Verify the DB",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Create the DATABASE and SCHEMAS",
        "description": "<p><span>NOTE: The Sandbox_DB and Sandbox_WH are new additions to Trial Accounts that began for some accounts in early 2025.</span></p>",
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785167250881_Create_a_New_Database_uYVlXS3qW.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "81406f55b6",
          "html": "<p><span>NOTE: The Sandbox_DB and Sandbox_WH are new additions to Trial Accounts that began for some accounts in early 2025.</span></p>"
         },
         {
          "type": "image",
          "id": "f4c703e68a",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785167250881_Create_a_New_Database_uYVlXS3qW.webp",
          "caption": null
         }
        ]
       },
       {
        "title": "View SCHEMAS",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785167257073_view_the_schema_1mlW_R8iB.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "image",
          "id": "8f60d7a196",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785167257073_view_the_schema_1mlW_R8iB.webp",
          "caption": null
         }
        ]
       },
       {
        "title": "Explore Your New Database",
        "description": "<ol><li><p>How many schemas are included in your database?</p></li><li><p>What are the names of the schemas?</p></li><li><p>What is inside each of the schemas? Are there lots of objects, just a few, or none?</p></li></ol>",
        "code": null,
        "codeLang": null,
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "9dbad06055",
          "html": "<ol><li><p>How many schemas are included in your database?</p></li><li><p>What are the names of the schemas?</p></li><li><p>What is inside each of the schemas? Are there lots of objects, just a few, or none?</p></li></ol>"
         }
        ]
       },
       {
        "title": "Transfer Ownership of Your New Database",
        "description": "<p><strong>Transfer Ownership of Your Database to the SYSADMIN Role</strong></p>",
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785168672772_Transfer_Ownership_of_Your_Database_to_the_SYSADMIN_Role_zieqTus1g.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "daac37e837",
          "html": "<p><strong>Transfer Ownership of Your Database to the SYSADMIN Role</strong></p>"
         },
         {
          "type": "image",
          "id": "09b43ec63a",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785168672772_Transfer_Ownership_of_Your_Database_to_the_SYSADMIN_Role_zieqTus1g.webp",
          "caption": null
         }
        ]
       },
       {
        "title": "Switch Your System Role Back to SYSADMIN",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785168778407_switch_back_to_sysadmin_r8Qcl6v9V.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "image",
          "id": "3e10bab644",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785168778407_switch_back_to_sysadmin_r8Qcl6v9V.webp",
          "caption": null
         }
        ]
       }
      ]
     },
     {
      "title": "Roles & Access",
      "overview": "<p>In this lab, you will:</p><ol><li><p>Give the <code>SYSADMIN</code> role access to the <code>PUBLIC</code> schema.</p></li><li><p>Complete a challenge lab by creating a database named <code>UTIL_DB</code>.</p></li><li><p>Ensure that both <code>UTIL_DB</code> and its <code>PUBLIC</code> schema are owned by <code>SYSADMIN</code>.</p></li><li><p>Review the warehouses available in the Snowflake Trial account.</p></li><li><p>Transfer ownership of the <code>COMPUTE_WH</code> warehouse from <code>ACCOUNTADMIN</code> to <code>SYSADMIN</code>.</p></li></ol>",
      "explanation": "<p>This lab introduces Snowflake’s role-based access and ownership model. Learners work with the <code>SYSADMIN</code> and <code>ACCOUNTADMIN</code> roles to understand how access to databases, schemas, and warehouses is controlled through ownership.</p><p>The lab also demonstrates that creating objects while using the correct role can prevent unnecessary ownership transfers later.</p>",
      "output": "<p>The <code>UTIL_DB</code> database is successfully created and appears in <strong>Database Explorer</strong> with its <code>PUBLIC</code> schema. Both the database and the schema are owned by the <code>SYSADMIN</code> role.</p><p>The <code>COMPUTE_WH</code> warehouse is also transferred to <code>SYSADMIN</code>, allowing the role to manage and use the warehouse. Since <code>ACCOUNTADMIN</code> is higher in the role hierarchy, it continues to retain access even after ownership is transferred to <code>SYSADMIN</code>.</p>",
      "outputCode": null,
      "flow": [
       {
        "id": "7a270eda66",
        "label": "Goto DEMO_DB",
        "type": "process"
       },
       {
        "id": "dcab45dce1",
        "label": "Select PUBLIC Schema",
        "type": "process"
       },
       {
        "id": "51ff8bb4de",
        "label": "Give the SYSADMIN role access to the PUBLIC schema",
        "type": "process"
       },
       {
        "id": "d0ec8d362f",
        "label": "Create \"UTIL_DB\" from Account Admin",
        "type": "io"
       },
       {
        "id": "274db1e9e1",
        "label": "Transfer \"UTIL_DB\" Ownership to SYSADMIN",
        "type": "io"
       },
       {
        "id": "111dee1d3d",
        "label": "Goto Compute",
        "type": "process"
       },
       {
        "id": "76719090d3",
        "label": "Transfer the COMPUTE_WH warehouse to SYSADMIN",
        "type": "io"
       },
       {
        "id": "215aa40a56",
        "label": "Verify Ownerships",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Give SYSADMIN \"Access\" to the PUBLIC Schema",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785170113641_Give_SYSADMIN_Access_to_the_PUBLIC_Schema_4xhdNmp4D.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "image",
          "id": "b06f51c14f",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785170113641_Give_SYSADMIN_Access_to_the_PUBLIC_Schema_4xhdNmp4D.webp",
          "caption": null
         }
        ]
       },
       {
        "title": "Role, Creation, & Ownership Challenge Lab!",
        "description": "<p>This is a Challenge Lab! Challenge Labs are different from other labs because we don't give you the step-by-step instructions. Instead, we give you the end goal and expect you to use the skills you learned in earlier labs to complete the work. <span><strong>Challenge labs are required.</strong></span></p><p>Good Luck!</p><p><span><strong><mark data-color=\"#9900ff\">Create a new database and name it UTIL_DB. This database and the PUBLIC schema should be owned by SYSADMIN.</mark></strong></span></p><p><strong>HINT:</strong> If you set your role to SYSADMIN before you create the database, it will automatically be owned by SYSADMIN. You won't have to do any transfers of ownership. If you forget to set your role to SYSADMIN before creating the UTIL_DB, you will need to transfer ownership to SYSADMIN.</p>",
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785170954390_Does_Your_Databases_Page_Look_Like_This__Now_tDsPm9laj.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "7b1dcd16c7",
          "html": "<p>This is a Challenge Lab! Challenge Labs are different from other labs because we don't give you the step-by-step instructions. Instead, we give you the end goal and expect you to use the skills you learned in earlier labs to complete the work. <span><strong>Challenge labs are required.</strong></span></p><p>Good Luck!</p><p><span><strong><mark data-color=\"#9900ff\">Create a new database and name it UTIL_DB. This database and the PUBLIC schema should be owned by SYSADMIN.</mark></strong></span></p><p><strong>HINT:</strong> If you set your role to SYSADMIN before you create the database, it will automatically be owned by SYSADMIN. You won't have to do any transfers of ownership. If you forget to set your role to SYSADMIN before creating the UTIL_DB, you will need to transfer ownership to SYSADMIN.</p>"
         },
         {
          "type": "image",
          "id": "a7e37c17fd",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785170954390_Does_Your_Databases_Page_Look_Like_This__Now_tDsPm9laj.webp",
          "caption": null
         }
        ]
       },
       {
        "title": "CHALLENGE LAB: Make the Warehouse Available to SYSADMIN",
        "description": "<p>There are different ways to make a compute resource available to different roles, but as we saw with databases, sometimes the easiest way to grant access is to transfer ownership to a lower role.  Since the ACCOUNTADMIN role is in the same tree as the SYSADMIN role, ACCOUNTADMIN will still have access to the warehouse, even if SYSADMIN is the owner.</p><p>Transfer the COMPUTE_WH warehouse to SYSADMIN.</p>",
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785169037310_CHALLENGE_LAB_Make_the_Warehouse_Available_to_SYSADMIN_RDLc3E6_C.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "025f9b6f69",
          "html": "<p>There are different ways to make a compute resource available to different roles, but as we saw with databases, sometimes the easiest way to grant access is to transfer ownership to a lower role.  Since the ACCOUNTADMIN role is in the same tree as the SYSADMIN role, ACCOUNTADMIN will still have access to the warehouse, even if SYSADMIN is the owner.</p><p>Transfer the COMPUTE_WH warehouse to SYSADMIN.</p>"
         },
         {
          "type": "image",
          "id": "6d71481c55",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785169037310_CHALLENGE_LAB_Make_the_Warehouse_Available_to_SYSADMIN_RDLc3E6_C.webp",
          "caption": null
         }
        ]
       }
      ]
     },
     {
      "title": "Challenge Lab - Uncle YER",
      "overview": null,
      "explanation": "<p>This challenge lab applies the Snowflake setup skills learned in the previous activities. Learners create a structured database environment for the fictional <strong>Uncle Yer</strong> project, configure schemas, work inside a SQL file, create a table, inspect its definition, and insert data into it.</p><p>The activity also reinforces the importance of using the correct role and context. The <code>SYSADMIN</code> role must be able to access the required databases and schemas, while the selected database, schema, warehouse, and role must be correct before executing SQL commands.</p>",
      "output": "<p>The <code>GARDEN_PLANTS</code> database is successfully created under the <code>SYSADMIN</code> role and contains the following schemas:</p><ul><li><p><code>VEGGIES</code></p></li><li><p><code>FRUITS</code></p></li><li><p><code>FLOWERS</code></p></li><li><p><code>INFORMATION_SCHEMA</code></p></li></ul><p>The <code>PUBLIC</code> schema is not present.</p><p>A table named <code>ROOT_DEPTH</code> is created with the following columns:</p><ul><li><p><code>ROOT_DEPTH_ID</code></p></li><li><p><code>ROOT_DEPTH_CODE</code></p></li><li><p><code>ROOT_DEPTH_NAME</code></p></li><li><p><code>UNIT_OF_MEASURE</code></p></li><li><p><code>RANGE_MIN</code></p></li><li><p><code>RANGE_MAX</code></p></li></ul><p>The table definition can be viewed from Database Explorer. After completing the insert operations, the <code>ROOT_DEPTH</code> table contains three rows.</p>",
      "outputCode": null,
      "flow": [
       {
        "id": "abb885a0a4",
        "label": "Goto Catalog > Database Explorer",
        "type": "start"
       },
       {
        "id": "f568286b17",
        "label": "Create GARDEN_PLANTS Database as SYSADMIN",
        "type": "process"
       },
       {
        "id": "0eb716734e",
        "label": "Drop the PUBLIC schema",
        "type": "process"
       },
       {
        "id": "eb39fe86d6",
        "label": "Create VEGGIES, FRUITS and FLOWERS Schemas",
        "type": "process"
       },
       {
        "id": "79bc6823e4",
        "label": "Verify Database & Schemas",
        "type": "decision"
       },
       {
        "id": "a800a8f5cd",
        "label": "Create Snowflake Worksheet",
        "type": "process"
       },
       {
        "id": "6adc892519",
        "label": "Execute SQL Queries in Worksheet",
        "type": "io"
       },
       {
        "id": "5c14b845fa",
        "label": "Create ROOT_DEPTH Table",
        "type": "process"
       },
       {
        "id": "be7a2b477a",
        "label": " Find & View the Definition of ROOT_DEPTH Table",
        "type": "process"
       },
       {
        "id": "06830c29e8",
        "label": "insert records into ROOT_DEPTH Table",
        "type": "io"
       },
       {
        "id": "908d854a99",
        "label": "Verify Database, Table & Records",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "DB & SCHEMA for Uncle Yer",
        "description": "<p><strong>Uncle Yer Needs a Database and some Schemas</strong></p>",
        "code": "1. Set your role to SYSADMIN.\n2. Create a Database and name it GARDEN_PLANTS.\n3. Drop the PUBLIC schema that was automatically created when you created your GARDEN_PLANTS database.\n4. Create three new schemas in your GARDEN_PLANTS database. Name them VEGGIES, FRUITS and FLOWERS.",
        "codeLang": "text",
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785169081777_Set_Up_Uncle_Yer_s_Database___Schemas_y95NE7ccD.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "69568ffac2",
          "html": "<p><strong>Uncle Yer Needs a Database and some Schemas</strong></p>"
         },
         {
          "type": "snippet",
          "id": "4a1512cfb8",
          "lang": "text",
          "code": "1. Set your role to SYSADMIN.\n2. Create a Database and name it GARDEN_PLANTS.\n3. Drop the PUBLIC schema that was automatically created when you created your GARDEN_PLANTS database.\n4. Create three new schemas in your GARDEN_PLANTS database. Name them VEGGIES, FRUITS and FLOWERS.",
          "label": null
         },
         {
          "type": "image",
          "id": "f7929edbcb",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785169081777_Set_Up_Uncle_Yer_s_Database___Schemas_y95NE7ccD.webp",
          "caption": null
         }
        ]
       },
       {
        "title": "Worksheet Setup",
        "description": "<p>In September 2025, Snowflake introduced Workspaces, which combines the functionality of Worksheets, Notebooks, File Manager, Query History, Results / Output, and the Database Explorer into a new, integrated development environment.</p><p>Workspaces will be the new default editor and replace Worksheets.</p>",
        "code": "1. click on create near home button to create a SQL file\n2. rename the file to any name \n3. type the SQL code below and click on Run",
        "codeLang": "text",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "500a7a8615",
          "html": "<p>In September 2025, Snowflake introduced Workspaces, which combines the functionality of Worksheets, Notebooks, File Manager, Query History, Results / Output, and the Database Explorer into a new, integrated development environment.</p><p>Workspaces will be the new default editor and replace Worksheets.</p>"
         },
         {
          "type": "snippet",
          "id": "4108f61351",
          "lang": "text",
          "code": "1. click on create near home button to create a SQL file\n2. rename the file to any name \n3. type the SQL code below and click on Run",
          "label": null
         },
         {
          "type": "snippet",
          "id": "ac825f2c07",
          "lang": "sql",
          "code": "select 'hello!';\nselect 'hello!' as \"Greeting\";",
          "label": null
         }
        ]
       },
       {
        "title": "SQL File & Execution",
        "description": "<p><span>Every .sql file has 4 dropdown menus near the top. Two are in the upper right corner and two are close to the first line of code. Which two are near the code? Which two are in the upper right corner?</span></p>",
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785169121492_Worksheet_Context_Menus_lo-Y328h7.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "063cafb3cd",
          "html": "<p><span>Every .sql file has 4 dropdown menus near the top. Two are in the upper right corner and two are close to the first line of code. Which two are near the code? Which two are in the upper right corner?</span></p>"
         },
         {
          "type": "image",
          "id": "10aae6ac77",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785169121492_Worksheet_Context_Menus_lo-Y328h7.webp",
          "caption": null
         }
        ]
       },
       {
        "title": "ROOT_DEPTH Table - Challenge Lab",
        "description": "<p>Make sure SYSADMIN can see all the databases and schemas that have been created. If that role cannot see everything that ACCOUNTADMIN can see, FIX IT. As ACCOUNTADMIN you can Transfer Ownership or drop the object. Then, you can recreate the objects while your role is set to SYSADMIN.</p><p>Also, make sure there is no PUBLIC schema in the GARDEN_PLANTS database. You were supposed to delete that, remember?</p><p>You will encounter issues later if this is not fixed now.</p>",
        "code": "--Be sure to set your context menus\ncreate or replace table ROOT_DEPTH (\n   ROOT_DEPTH_ID number(1), \n   ROOT_DEPTH_CODE text(1), \n   ROOT_DEPTH_NAME text(7), \n   UNIT_OF_MEASURE text(2),\n   RANGE_MIN number(2),\n   RANGE_MAX number(2)\n   ); ",
        "codeLang": "sql",
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785171321081_create_your_root_depth_table_SDwRGhnfz.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "91f56a4afc",
          "html": "<p>Make sure SYSADMIN can see all the databases and schemas that have been created. If that role cannot see everything that ACCOUNTADMIN can see, FIX IT. As ACCOUNTADMIN you can Transfer Ownership or drop the object. Then, you can recreate the objects while your role is set to SYSADMIN.</p><p>Also, make sure there is no PUBLIC schema in the GARDEN_PLANTS database. You were supposed to delete that, remember?</p><p>You will encounter issues later if this is not fixed now.</p>"
         },
         {
          "type": "snippet",
          "id": "ceae2d1dd5",
          "lang": "sql",
          "code": "--Be sure to set your context menus\ncreate or replace table ROOT_DEPTH (\n   ROOT_DEPTH_ID number(1), \n   ROOT_DEPTH_CODE text(1), \n   ROOT_DEPTH_NAME text(7), \n   UNIT_OF_MEASURE text(2),\n   RANGE_MIN number(2),\n   RANGE_MAX number(2)\n   ); ",
          "label": null
         },
         {
          "type": "image",
          "id": "ae459a2a42",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785171321081_create_your_root_depth_table_SDwRGhnfz.webp",
          "caption": null
         }
        ]
       },
       {
        "title": "Find & View the Definition of Your Table",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785169187251_View_the_Definition_of_Your_Table_lFH6rW5sA.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "image",
          "id": "f456f245e3",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785169187251_View_the_Definition_of_Your_Table_lFH6rW5sA.webp",
          "caption": null
         }
        ]
       },
       {
        "title": "Getting Rows of Data Into Table & Preview",
        "description": "<p>Before the end of this workshop you will have experience loading data:</p><ol><li><p>Using an INSERT statement from the Worksheet.</p></li><li><p>Using the Load Data Wizard.</p></li><li><p>Using COPY INTO statements.</p></li></ol>",
        "code": "insert into root_depth \nvalues\n(\n    1,\n    'S',\n    'Shallow',\n    'cm',\n    30,\n    45\n);",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "0d2eb629e4",
          "html": "<p>Before the end of this workshop you will have experience loading data:</p><ol><li><p>Using an INSERT statement from the Worksheet.</p></li><li><p>Using the Load Data Wizard.</p></li><li><p>Using COPY INTO statements.</p></li></ol>"
         },
         {
          "type": "snippet",
          "id": "81cdea2b46",
          "lang": "sql",
          "code": "insert into root_depth \nvalues\n(\n    1,\n    'S',\n    'Shallow',\n    'cm',\n    30,\n    45\n);",
          "label": null
         }
        ]
       },
       {
        "title": "Challenge Lab",
        "description": "<p><strong>Add Two More Rows to the ROOT_DEPTH Table</strong></p><p>Edit the Insert Statement (twice) and run it (twice) to add two additional rows in your ROOT_DEPTH table.</p>",
        "code": "1. Run your SELECT * to view all three rows of your ROOT_DEPTH table.\n\n2. Compare your results with the screenshot shown here.",
        "codeLang": "text",
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785169243015_Add_Two_More_Rows_to_the_ROOT_DEPTH_Table_uZKSCu3vB.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "7d536fae51",
          "html": "<p><strong>Add Two More Rows to the ROOT_DEPTH Table</strong></p><p>Edit the Insert Statement (twice) and run it (twice) to add two additional rows in your ROOT_DEPTH table.</p>"
         },
         {
          "type": "snippet",
          "id": "dfe021e751",
          "lang": "text",
          "code": "1. Run your SELECT * to view all three rows of your ROOT_DEPTH table.\n\n2. Compare your results with the screenshot shown here.",
          "label": null
         },
         {
          "type": "image",
          "id": "f48f0b6b59",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785169243015_Add_Two_More_Rows_to_the_ROOT_DEPTH_Table_uZKSCu3vB.webp",
          "caption": null
         }
        ]
       }
      ]
     },
     {
      "title": "Resource Monitor Setup",
      "overview": "<p>This lab introduces Snowflake warehouses and resource monitoring. In Snowflake, a warehouse does not store data. It acts as the compute workforce responsible for processing queries and other data operations.</p><p>Warehouse size determines the number of servers available in a cluster. Increasing or decreasing the warehouse size is called <strong>scaling up or scaling down</strong>. In editions that support multi-cluster warehouses, Snowflake can also add or remove clusters based on workload demand, which is known as <strong>scaling out or scaling in</strong>.</p><p>Because warehouse activity consumes Snowflake credits, a resource monitor is configured to track usage and prevent unexpected credit consumption.</p>",
      "explanation": "<p><span><strong>Defining \"Warehouse\" in Snowflake:</strong></span></p><ul><li><p>People who have been working with data for awhile might think of the term \"Data Warehouse\" as referring to a special collection of data structures, but in Snowflake, warehouses don't store data.</p></li><li><p>In Snowflake, Warehouses are \"workforces\" -- they are used to perform the processing of data.</p></li><li><p>When you create a Warehouse in Snowflake, you are defining a \"workforce.\"</p></li></ul><p><span><strong>Teams are Clusters, Team Members are Servers:</strong></span></p><ul><li><p>In the video, the workforce of each warehouse is a team. A small warehouse has a small team, but just one team. An extra-large warehouse has a large team, but just one team.  </p></li><li><p>Snowflake Warehouse Sizes like eXtra-Small, Small, Medium, etc. all have one cluster. A small warehouse has one cluster made up of just a few servers. A larger warehouse has one cluster, made up of more servers.</p></li></ul><p><span><strong>Scaling Up and Down:</strong></span></p><ul><li><p>Changing the size of warehouse changes the number of servers in the cluster.</p></li><li><p>Changing the size of an existing warehouse is called scaling up or scaling down.</p></li></ul><p><span><strong>Scaling In and Out:</strong></span></p><ul><li><p>If multi-cluster/elastic warehousing is available (Enterprise edition or above) a warehouse is capable of scaling out in times of increased demand.  (Adding temporary teams, made up of a collection of temporary workers).</p></li><li><p>If multi-cluster scaling out takes place, clusters are added for the period of demand and then clusters are removed (snap back) when demand decreases. (Removing temporary teams).</p></li><li><p>The number of servers in the original cluster dictates the number of servers in each cluster during periods where the warehouse scales out by adding clusters.</p></li></ul>",
      "output": "<p>A resource monitor is successfully created in Snowflake with a defined credit quota, monitoring frequency, schedule, and usage thresholds.</p><p>The monitor tracks account or warehouse credit consumption and performs the configured actions when usage approaches or reaches the defined limit. This helps prevent uncontrolled compute usage and unexpected credit exhaustion.</p><blockquote><p><span><strong>Just because additional compute power is available does not mean it should be used without limits. Always monitor Snowflake credit consumption using a resource monitor.</strong></span></p></blockquote>",
      "outputCode": null,
      "flow": [
       {
        "id": "e3a278a798",
        "label": "Goto Admin",
        "type": "start"
       },
       {
        "id": "5df831f440",
        "label": "Goto Resource Monitors",
        "type": "process"
       },
       {
        "id": "e87675e43a",
        "label": "Create new Resource Monitor",
        "type": "process"
       },
       {
        "id": "d08652d313",
        "label": "Setup Resource Quota Config & Apply",
        "type": "io"
       },
       {
        "id": "e7c1f776db",
        "label": "Verify the Resource Monitor",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Set Up A Resource Monitor",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785169500266_Set_Up_A_Resource_Monitor_pf8aqGbWE.webp",
        "imageCaption": null,
        "blocks": []
       }
      ]
     },
     {
      "title": "Dora Lab Setup",
      "overview": null,
      "explanation": "<p>This lab configures Snowflake University’s <strong>D.O.R.A. Auto-Grader</strong>, where D.O.R.A. stands for <strong>Diagnostic Online Results Assessor</strong>. The grader is used to verify whether later Snowflake lab activities have been completed correctly.</p><p>The setup connects Snowflake to the DORA grading service through an API integration. An external function named <code>GRADER</code> is then created inside the <code>UTIL_DB.PUBLIC</code> schema.</p><p>When the function is called, it compares the learner’s actual result with the expected result and returns a structured grading response.</p>",
      "output": "<p>The API integration and external <code>GRADER</code> function are successfully created. Running the test query produces a grading result containing:</p><ul><li><p>Step: <code>DORA_IS_WORKING</code></p></li><li><p>Actual value: <code>123</code></p></li><li><p>Expected value: <code>123</code></p></li><li><p>Passed status: <code>TRUE</code></p></li><li><p>Description: <code>Dora is working!</code></p></li></ul><p>The result confirms that Snowflake can communicate with the DORA grading service and that the <code>GRADER</code> function is ready to verify upcoming lab exercises.</p><p>The learner should also be able to locate and debug the function using <code>SHOW FUNCTIONS IN ACCOUNT</code> when any role, database, or schema-context issue occurs.</p>",
      "outputCode": null,
      "flow": [
       {
        "id": "2d0549411c",
        "label": "Create Worksheet & name it \"DORA\"",
        "type": "start"
       },
       {
        "id": "d286ad4ac7",
        "label": "Set Role & DB , Schema (Account Admin, UTIL_DB, PUBLIC)",
        "type": "process"
       },
       {
        "id": "60543d0bc2",
        "label": "Create an API Integration",
        "type": "io"
       },
       {
        "id": "8e1aa56e96",
        "label": "Create the GRADER Function",
        "type": "io"
       },
       {
        "id": "08d508bab2",
        "label": "Verify GRADER Function (DORA)",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Meet DORA....!",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785171644085_dora_naming_AW7qxBIaG.webp",
        "imageCaption": null,
        "blocks": []
       },
       {
        "title": "Create an API Integration......",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": null,
        "imageCaption": null,
        "blocks": []
       },
       {
        "title": "Create the GRADER Function",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785169681196_dora_is_working_vCknqR-B6.webp",
        "imageCaption": null,
        "blocks": []
       },
       {
        "title": "FailSafe (Only Follow if Grader shows ERROR) else SKIP",
        "description": "<p>If you get a message saying the <strong>GRADER function doesn't exist</strong>, check to make sure your role is set to ACCOUNTADMIN in the upper right corner of the worksheet!</p><p>If you still get an error, type <strong><em>show functions in account;</em></strong> in a worksheet.</p><p>If your GRADER function is not in your UTIL_DB.PUBLIC schema, you have two options:</p><ol><li><p>1) Move the function by renaming it. Something like:</p><ol><li><p>ALTER FUNCTION GARDEN_PLANTS.VEGGIE.GRADER RENAME TO UTIL_DB.PUBLIC.GRADER</p></li></ol></li><li><p>2) Edit the USE DATABASE line before running any GRADER calls.</p></li></ol>",
        "code": null,
        "codeLang": null,
        "image": null,
        "imageCaption": null,
        "blocks": []
       }
      ]
     },
     {
      "title": "Dora Check",
      "overview": "<p>In this lab, you will:</p><ol><li><p>Understand metadata as <strong>data about data</strong>.</p></li><li><p>Use <code>INFORMATION_SCHEMA</code> to inspect Snowflake objects.</p></li><li><p>Set the DORA execution context to:</p><ul><li><p>Database: <code>UTIL_DB</code></p></li><li><p>Schema: <code>PUBLIC</code></p></li><li><p>Role: <code>ACCOUNTADMIN</code></p></li></ul></li><li><p>Run five DORA validation checks.</p></li></ol>",
      "explanation": "<p>This lab uses the DORA auto-grader to verify that the initial Snowflake database, schema, and table setup has been completed correctly. The checks query Snowflake’s <code>INFORMATION_SCHEMA</code>, which stores metadata about objects such as databases, schemas, tables, views, and row counts.</p><p>Each DORA check compares the actual metadata in the learner’s Snowflake account with an expected value. Learners must correct their lab configuration when a check fails and must never modify the DORA validation code merely to produce a green result.</p>",
      "output": "<h2>Expected Output</h2><p>All five DORA checks return a successful grading result with:</p><h2><span><strong><mark data-color=\"#000000\">passed: true</mark></strong></span></h2><p>The completed setup should contain:</p><ul><li><p>Three required schemas in <code>GARDEN_PLANTS</code></p></li><li><p>No <code>PUBLIC</code> schema in <code>GARDEN_PLANTS</code></p></li><li><p>One <code>ROOT_DEPTH</code> table</p></li><li><p>Two schemas in <code>UTIL_DB</code></p></li><li><p>Three rows in the <code>ROOT_DEPTH</code> table</p></li></ul><p>Successful results for <code>DWW01</code> through <code>DWW05</code> confirm that the initial Snowflake DORA lab environment has been configured correctly and is ready for the next activities.</p>",
      "outputCode": null,
      "flow": [
       {
        "id": "535d383147",
        "label": "Goto \"DORA\" Worksheet",
        "type": "start"
       },
       {
        "id": "2536ebf9ba",
        "label": "Set Role & DB , Schema (Account Admin, UTIL_DB, PUBLIC)",
        "type": "process"
       },
       {
        "id": "e0e3d6fbf3",
        "label": "Run \"DORA DWW01\" - Schema Check(3)",
        "type": "io"
       },
       {
        "id": "eb818d3e5b",
        "label": "Run \"DORA DWW02\" - Drop Public Schema",
        "type": "io"
       },
       {
        "id": "3f2458fe69",
        "label": "Run \"DORA DWW03\" - ROOT_DEPTH Table",
        "type": "io"
       },
       {
        "id": "6fee594acc",
        "label": "Run \"DORA DWW04\" - UTIL_DB Schemas",
        "type": "io"
       },
       {
        "id": "88bec6ccd1",
        "label": "Run \"DORA DWW05\" - ROOT_DEPTH 3 rows",
        "type": "io"
       },
       {
        "id": "d63b630004",
        "label": "Verify all DORA passed: true ",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "What is Metadata?",
        "description": "<p>The word \"metadata\" means \"data about data.\"</p><p>The INFORMATION_SCHEMA that gets created in every Snowflake Database holds metadata. In other words, it holds statistics about the number of databases, schemas, tables, views and more. It also holds data about the object names and other object details.</p><p>Notice that in all the queries above, we are using the INFORMATION_SCHEMA to double-check our work and make sure we completed the tasks correctly.</p>",
        "code": null,
        "codeLang": null,
        "image": null,
        "imageCaption": null,
        "blocks": []
       },
       {
        "title": "DORA DWW01",
        "description": "<p><span><strong><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></strong></span></p>",
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785171704772_Dora_01_4h3XvMcax.webp",
        "imageCaption": null,
        "blocks": []
       },
       {
        "title": "DORA DWW02",
        "description": "<p><span><strong><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></strong></span></p>",
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785171711631_Dora_02_-t03SMYoc.webp",
        "imageCaption": null,
        "blocks": []
       },
       {
        "title": "DORA DWW03",
        "description": "<p><span><strong><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></strong></span></p>",
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785299141568_dora_03_xgBXNdX_U.webp",
        "imageCaption": null,
        "blocks": []
       },
       {
        "title": "DORA DWW04",
        "description": "<p><span><strong><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></strong></span></p>",
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785172678495_dora_04_fzaNUl7gb.webp",
        "imageCaption": null,
        "blocks": []
       },
       {
        "title": "DORA DWW05",
        "description": "<p><span><strong><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></strong></span></p>",
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785299157468_dora_05_jxAdz3C4R.webp",
        "imageCaption": null,
        "blocks": []
       }
      ]
     }
    ]
   },
   {
    "title": "Data Ingestion",
    "order": 1,
    "linkUrl": null,
    "modules": [
     {
      "title": "CSV Data Ingestion",
      "overview": "<p><strong>Required Files :</strong></p><p>File 1 (Git):</p><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/atomcollectdsu-crypto/Snowflake-DWW-labfiles/blob/main/veggie_details_a_to_k_comma_opt_enclosed.csv\"><span><strong><mark data-color=\"#9900ff\">veggie_details_a_to_k_comma_opt_enclosed.csv</mark></strong></span></a></p><p>File 2 (Git):</p><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/atomcollectdsu-crypto/Snowflake-DWW-labfiles/blob/main/veggie_details_k_to_z_pipe.csv\"><span><mark data-color=\"#9900ff\">veggie_details_k_to_z_pipe.csv</mark></span></a></p>",
      "explanation": "<h2>Title</h2><p><strong>CSV Data Ingestion Using Snowflake’s Load Data Interface</strong></p><h2>Introduction</h2><p>Data ingestion enables structured information from external files to be brought into Snowflake for storage, analysis, and reporting. This lab introduces how files with different delimiters can be loaded into the same table while ensuring that source columns are mapped correctly to the destination structure.</p><p>A table named <code>VEGETABLE_DETAILS</code> is created in the <code>GARDEN_PLANTS.VEGGIES</code> schema to store vegetable names and root-depth codes.</p><p>The data is loaded in two parts through Snowflake’s <strong>Load Data</strong> interface:</p><ul><li><p>The first file contains comma-separated values and contributes 21 rows.</p></li><li><p>The second file contains pipe-separated values and contributes another 21 rows.</p></li></ul><p>For each file, the appropriate delimiter, header option, text-enclosure setting, and column mapping are selected. After both files are loaded, the table contains vegetable records covering the complete A-to-Z range.</p>",
      "output": "<p><span><strong><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></strong></span></p><h2>Output</h2><p>After completing the lab successfully:</p><ul><li><p>The <code>GARDEN_PLANTS.VEGGIES.VEGETABLE_DETAILS</code> table is created.</p></li><li><p>The first file loads <strong>21 rows</strong>.</p></li><li><p>The second file loads <strong>21 rows</strong>.</p></li><li><p>The final table contains <strong>42 rows</strong>.</p></li><li><p>The following query returns <code>42</code>:</p></li></ul>",
      "outputCode": "--Set your worksheet drop list role to ACCOUNTADMIN\n--Set your worksheet drop list database and schema to the location of your GRADER function\n\n-- DO NOT EDIT ANYTHING BELOW THIS LINE. THE CODE MUST BE RUN EXACTLY AS IT IS WRITTEN\nselect GRADER(step, (actual = expected), actual, expected, description) as graded_results from (\n SELECT 'DWW06' as step\n ,( select count(*) \n   from GARDEN_PLANTS.INFORMATION_SCHEMA.TABLES \n   where table_name = 'VEGETABLE_DETAILS') as actual\n , 1 as expected\n ,'VEGETABLE_DETAILS Table' as description\n); ",
      "flow": [
       {
        "id": "562533366f",
        "label": "Goto GARDEN_PLANTS",
        "type": "start"
       },
       {
        "id": "81651846e8",
        "label": "Create Vegetable Details Table",
        "type": "process"
       },
       {
        "id": "069a7d215e",
        "label": "Download .CSV file",
        "type": "process"
       },
       {
        "id": "8dc01bd4f0",
        "label": "file upload to VEGETABLE_DETAILS",
        "type": "io"
       },
       {
        "id": "3c21e0eb68",
        "label": "Map the headers",
        "type": "process"
       },
       {
        "id": "75870bcff3",
        "label": "Verify the records",
        "type": "decision"
       },
       {
        "id": "79d0193608",
        "label": "Download .CSV file (new)",
        "type": "process"
       },
       {
        "id": "6511105ddf",
        "label": "file upload to VEGETABLE_DETAILS",
        "type": "io"
       },
       {
        "id": "2713fa0d9f",
        "label": "Map the headers",
        "type": "process"
       },
       {
        "id": "babfa7218d",
        "label": "Verify the records",
        "type": "decision"
       },
       {
        "id": "fe0df18255",
        "label": "Run DORA",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Create a Vegetable Details Table",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": null,
        "imageCaption": null,
        "blocks": []
       },
       {
        "title": "Upload the File Into Your Veggie Details Table!",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": null,
        "imageCaption": null,
        "blocks": []
       },
       {
        "title": "Loading Table Rows from a File (K to Z)",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": null,
        "imageCaption": null,
        "blocks": []
       }
      ]
     },
     {
      "title": "Viewing Our Table Data",
      "overview": null,
      "explanation": "<h2>Title</h2><p><strong>Viewing and Cleaning Table Data in Snowflake</strong></p><h2>Introduction</h2><p>Reviewing table data is an essential step in maintaining data quality. It helps identify duplicate, inaccurate, or unnecessary records so that the dataset remains reliable and ready for analysis.</p><h2>Explanation</h2><p>The <code>VEGETABLE_DETAILS</code> table is queried to review all the available records. During inspection, two entries for <code>Spinach</code> are identified.</p><p>The unwanted record is removed by applying conditions to both the plant name and root-depth code. Using both conditions ensures that only the specific <code>Spinach</code> record with the root-depth code <code>D</code> is deleted, rather than deleting every record for that plant.</p><p>After the deletion, the table should be queried again to confirm that the duplicate has been removed and the correct record remains.</p>",
      "output": "<p><span><strong><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></strong></span></p><p>After completing the lab successfully:</p><ul><li><p>The table data is displayed for inspection.</p></li><li><p>The unwanted <code>Spinach</code> record with root-depth code <code>D</code> is deleted.</p></li><li><p>One valid <code>Spinach</code> record remains.</p></li><li><p>The <code>VEGETABLE_DETAILS</code> table contains <strong>41 rows</strong>.</p></li><li><p>The DORA grader for step <code>DWW07</code> returns a successful result when the actual row count matches the expected count of <code>41</code>.</p></li></ul>",
      "outputCode": "--Set your worksheet drop list role to ACCOUNTADMIN\n--Set your worksheet drop list database and schema to the location of your GRADER function\n\n-- DO NOT EDIT ANYTHING BELOW THIS LINE. THE CODE MUST BE RUN EXACTLY AS IT IS WRITTEN\nselect GRADER(step, (actual = expected), actual, expected, description) as graded_results from (\n SELECT 'DWW07' as step\n ,( select row_count \n   from GARDEN_PLANTS.INFORMATION_SCHEMA.TABLES \n   where table_name = 'VEGETABLE_DETAILS') as actual\n , 41 as expected\n , 'VEG_DETAILS row count' as description\n); ",
      "flow": [
       {
        "id": "4eb0abe77e",
        "label": "Open Lab Worksheet",
        "type": "start"
       },
       {
        "id": "b15b187a96",
        "label": "View VEGETABLE_DETAILS records",
        "type": "process"
       },
       {
        "id": "cf2b0546f7",
        "label": "Delete duplicate Record",
        "type": "io"
       },
       {
        "id": "b61da4dcad",
        "label": "Verify the Count",
        "type": "decision"
       },
       {
        "id": "96ae12d74c",
        "label": "Run DORA",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "View Your Vegetable Details Table",
        "description": "<p>This challenge lab does not include step-by-step details, but guidance for achieving several goals.</p><ul><li><p>View your data</p></li><li><p>Notice a plant name that appears twice in the data set</p></li><li><p>Find a way to get rid of it</p></li><li><p>View your data again</p></li></ul>",
        "code": "SELECT *\nFROM GARDEN_PLANTS.VEGGIES.VEGETABLE_DETAILS;\n-- in result tab go to chart [dont get surprised by two spinach entries]",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "efd5155810",
          "html": "<p>This challenge lab does not include step-by-step details, but guidance for achieving several goals.</p><ul><li><p>View your data</p></li><li><p>Notice a plant name that appears twice in the data set</p></li><li><p>Find a way to get rid of it</p></li><li><p>View your data again</p></li></ul>"
         },
         {
          "type": "snippet",
          "id": "1ab5dca88f",
          "lang": "sql",
          "code": "SELECT *\nFROM GARDEN_PLANTS.VEGGIES.VEGETABLE_DETAILS;\n-- in result tab go to chart [dont get surprised by two spinach entries]",
          "label": null
         },
         {
          "type": "snippet",
          "id": "0e91b945f1",
          "lang": "sql",
          "code": "DELETE FROM VEGETABLE_DETAILS\nWHERE PLANT_NAME = 'Spinach'\n  AND ROOT_DEPTH_CODE = 'D';",
          "label": null
         },
         {
          "type": "snippet",
          "id": "bf7a3d0e42",
          "lang": "sql",
          "code": "SELECT *\nFROM GARDEN_PLANTS.VEGGIES.VEGETABLE_DETAILS;",
          "label": null
         },
         {
          "type": "snippet",
          "id": "f79d6f1176",
          "lang": "sql",
          "code": "SELECT COUNT(*)\nFROM GARDEN_PLANTS.VEGGIES.VEGETABLE_DETAILS;",
          "label": null
         }
        ]
       }
      ]
     },
     {
      "title": "Snowflake Notebook",
      "overview": null,
      "explanation": "<h2>Title</h2><p><strong>Creating and Using a Snowflake Notebook</strong></p><h2>Introduction</h2><p>Snowflake Notebooks provide an interactive workspace for organizing SQL commands, documenting analysis, testing variables, and viewing query results in one place. This lab introduces how notebook cells can be arranged and executed to manage database records in a structured workflow.</p>",
      "output": "<p><span><strong><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></strong></span></p><p>After completing the lab successfully:</p><ul><li><p>A Snowflake Notebook is created and connected.</p></li><li><p>The <code>FLOWER_DETAILS</code> table contains the following records:</p></li></ul><table><colgroup><col><col></colgroup><tbody><tr><th colspan=\"1\" rowspan=\"1\"><p>Plant name</p></th><th colspan=\"1\" rowspan=\"1\"><p>Root-depth code</p></th></tr><tr><td colspan=\"1\" rowspan=\"1\"><p>Petunia</p></td><td colspan=\"1\" rowspan=\"1\"><p>M</p></td></tr><tr><td colspan=\"1\" rowspan=\"1\"><p>Lilac</p></td><td colspan=\"1\" rowspan=\"1\"><p>S</p></td></tr><tr><td colspan=\"1\" rowspan=\"1\"><p>Sunflower</p></td><td colspan=\"1\" rowspan=\"1\"><p>D</p></td></tr><tr><td colspan=\"1\" rowspan=\"1\"><p>Lavender</p></td><td colspan=\"1\" rowspan=\"1\"><p>S</p></td></tr><tr><td colspan=\"1\" rowspan=\"1\"><p>Tulip</p></td><td colspan=\"1\" rowspan=\"1\"><p>M</p></td></tr></tbody></table>",
      "outputCode": "USE ROLE ACCOUNTADMIN;\nUSE DATABASE UTIL_DB;\nUSE SCHEMA PUBLIC;\n\nSELECT GRADER(\n    step,\n    (actual = expected),\n    actual,\n    expected,\n    description\n) AS graded_results\nFROM (\n    SELECT 'DWW08' AS step,\n    (\n        SELECT IFF(COUNT(*) = 0, 0, COUNT(*)/COUNT(*))\n        FROM SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY\n        WHERE DIRECT_OBJECTS_ACCESSED::VARCHAR ILIKE '%Uncle Yer%'\n    ) AS actual,\n    1 AS expected,\n    'Notebook success!' AS description\n);",
      "flow": [
       {
        "id": "bdc4d1f0b2",
        "label": "Open Lab worksheet",
        "type": "start"
       },
       {
        "id": "bf1b613806",
        "label": "Set DB: Garden Plants & SCHEMA : Flowers & ROLE : SYSADMIN",
        "type": "process"
       },
       {
        "id": "37d78b8b52",
        "label": "Create Table FLOWER_DETAILS",
        "type": "process"
       },
       {
        "id": "1bab7bafdc",
        "label": "Create Snowflake Notebook",
        "type": "io"
       },
       {
        "id": "4e49e11580",
        "label": "Add MarkDown Cell",
        "type": "process"
       },
       {
        "id": "4b0910fc69",
        "label": "Add SQL CELL named 'insert_row'",
        "type": "process"
       },
       {
        "id": "4f0b816b3f",
        "label": "Add SQL CELL named 'check_the_table'",
        "type": "process"
       },
       {
        "id": "e946832cfb",
        "label": "Add SQL CELL named 'set_flower_name'",
        "type": "process"
       },
       {
        "id": "2489d0bbaf",
        "label": "Add SQL CELL named 'set_root_depth_code'",
        "type": "process"
       },
       {
        "id": "a2d5a5c952",
        "label": "Add SQL CELL named 'check_my_variables'",
        "type": "process"
       },
       {
        "id": "710cd534c5",
        "label": "replace the SQL of 'insert_row'",
        "type": "process"
       },
       {
        "id": "6284da3cf7",
        "label": "Arrange the cells in order",
        "type": "process"
       },
       {
        "id": "0edf6492de",
        "label": "Run the Sheet",
        "type": "io"
       },
       {
        "id": "bb011e4b0a",
        "label": "Change $FN, $RDC and RUN",
        "type": "io"
       },
       {
        "id": "0d6ea3788a",
        "label": "Run DORA",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "create flower_details table in flower schema",
        "description": null,
        "code": "CREATE OR REPLACE TABLE GARDEN_PLANTS.FLOWERS.FLOWER_DETAILS\n(\n    PLANT_NAME VARCHAR(25),\n    ROOT_DEPTH_CODE VARCHAR(1)\n);",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "f2a8095c88",
          "lang": "sql",
          "code": "CREATE OR REPLACE TABLE GARDEN_PLANTS.FLOWERS.FLOWER_DETAILS\n(\n    PLANT_NAME VARCHAR(25),\n    ROOT_DEPTH_CODE VARCHAR(1)\n);",
          "label": null
         }
        ]
       },
       {
        "title": "Create a Snowflake Notebook",
        "description": "<ol><li><p>Open <strong>Projects</strong> from the Snowflake navigation menu.</p></li><li><p>Select <strong>Workspaces</strong>.</p></li><li><p>Click <strong>Add new</strong> and choose <strong>Notebook</strong>.</p></li><li><p>Enter a notebook name, such as <strong>Uncle Yers Root Depth Notebook.ipynb</strong>.</p></li><li><p>Open the notebook and click <strong>Connect</strong>.</p></li><li><p>Select <strong>Create new service</strong>.</p></li><li><p>Enter the service name:</p></li></ol><p>NOTEBOOK_SERVICE</p><p>8. Review the service configuration and click <strong>Create and connect</strong>.</p><p>after the services gets connected , delete the example cells <span>Repeat the process until ONLY one MARKDOWN CELL remains, or create a new Markdown cell:</span></p>",
        "code": null,
        "codeLang": null,
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "526f5b83c9",
          "html": "<ol><li><p>Open <strong>Projects</strong> from the Snowflake navigation menu.</p></li><li><p>Select <strong>Workspaces</strong>.</p></li><li><p>Click <strong>Add new</strong> and choose <strong>Notebook</strong>.</p></li><li><p>Enter a notebook name, such as <strong>Uncle Yers Root Depth Notebook.ipynb</strong>.</p></li><li><p>Open the notebook and click <strong>Connect</strong>.</p></li><li><p>Select <strong>Create new service</strong>.</p></li><li><p>Enter the service name:</p></li></ol><p>NOTEBOOK_SERVICE</p><p>8. Review the service configuration and click <strong>Create and connect</strong>.</p><p>after the services gets connected , delete the example cells <span>Repeat the process until ONLY one MARKDOWN CELL remains, or create a new Markdown cell:</span></p>"
         }
        ]
       },
       {
        "title": "Add Cells to the Notebook",
        "description": "<ol><li><p><strong>Add a SQL Cell &amp; Name It \"insert_row\"</strong></p></li></ol><p>2. <strong>Place an Insert Statement into Your Notebook Cell</strong></p><p>3. after pasting run the cell.</p>",
        "code": "insert into garden_plants.flowers.flower_details\nselect 'Petunia','M';",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "4070210289",
          "html": "<ol><li><p><strong>Add a SQL Cell &amp; Name It \"insert_row\"</strong></p></li></ol><p>2. <strong>Place an Insert Statement into Your Notebook Cell</strong></p><p>3. after pasting run the cell.</p>"
         },
         {
          "type": "snippet",
          "id": "228aa6afad",
          "lang": "sql",
          "code": "insert into garden_plants.flowers.flower_details\nselect 'Petunia','M';",
          "label": null
         }
        ]
       },
       {
        "title": "Create a New Cell & Fill It with a Select *",
        "description": "<ul><li><p>Create another SQL Cell</p></li><li><p>Name it \"check_the_table\"</p></li><li><p>Write a SELECT * statement on the flower_details table</p></li><li><p>Run the cell</p></li></ul>",
        "code": "select * from garden_plants.flowers.flower_details;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "8260e6d548",
          "html": "<ul><li><p>Create another SQL Cell</p></li><li><p>Name it \"check_the_table\"</p></li><li><p>Write a SELECT * statement on the flower_details table</p></li><li><p>Run the cell</p></li></ul>"
         },
         {
          "type": "snippet",
          "id": "1664fc2ca2",
          "lang": "sql",
          "code": "select * from garden_plants.flowers.flower_details;",
          "label": null
         }
        ]
       },
       {
        "title": "Create Three More Cells and Reorder the Cells",
        "description": "<ul><li><p>Create 3 More SQL Cells</p></li><li><p>Name one \"set_flower_name\" (empty for now)</p></li><li><p>Name another \"set_root_depth_code\" (empty for now)</p></li><li><p>Name the 3rd cell \"check_my_variables\" (empty for now)</p></li><li><p>Rearrange the cells using the methods shown here:</p></li></ul>",
        "code": "SET rdc = 'S';",
        "codeLang": "sql",
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785254070330_re-arrange_order_for_sql_cells_T1eaUofsi.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "361860c799",
          "html": "<ul><li><p>Create 3 More SQL Cells</p></li><li><p>Name one \"set_flower_name\" (empty for now)</p></li><li><p>Name another \"set_root_depth_code\" (empty for now)</p></li><li><p>Name the 3rd cell \"check_my_variables\" (empty for now)</p></li><li><p>Rearrange the cells using the methods shown here:</p></li></ul>"
         },
         {
          "type": "snippet",
          "id": "38712d8dde",
          "lang": "sql",
          "code": "SET rdc = 'S';",
          "label": null
         },
         {
          "type": "snippet",
          "id": "9b62f64a89",
          "lang": "sql",
          "code": "SET fn = 'Lilac';",
          "label": null
         },
         {
          "type": "snippet",
          "id": "634cb48506",
          "lang": "sql",
          "code": "select $fn, $rdc;",
          "label": null
         },
         {
          "type": "snippet",
          "id": "ed158c3c2a",
          "lang": "sql",
          "code": "INSERT INTO GARDEN_PLANTS.FLOWERS.FLOWER_DETAILS\nSELECT $fn, $rdc;",
          "label": null
         },
         {
          "type": "image",
          "id": "b9af553488",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785254070330_re-arrange_order_for_sql_cells_T1eaUofsi.webp",
          "caption": null
         }
        ]
       },
       {
        "title": "Use Your Notebook to Create 3 Additional Rows in the Flower Detail Table",
        "description": "<ul><li><p>A Sunflower should have deep roots.</p></li><li><p>Lavender can have shallow roots.</p></li><li><p>A Tulip has a bulb, not roots, but we'll say they need medium root depth.</p></li></ul>",
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785254633165_sis_form_5_rows_c2qkwIcmF.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "97303b0afc",
          "html": "<ul><li><p>A Sunflower should have deep roots.</p></li><li><p>Lavender can have shallow roots.</p></li><li><p>A Tulip has a bulb, not roots, but we'll say they need medium root depth.</p></li></ul>"
         },
         {
          "type": "image",
          "id": "252ab0aff5",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785254633165_sis_form_5_rows_c2qkwIcmF.webp",
          "caption": null
         }
        ]
       }
      ]
     },
     {
      "title": "StreamLit Application (Snowflake SIS)",
      "overview": null,
      "explanation": "<h2>Title</h2><p><strong>Building a Streamlit Data-Entry Application in Snowflake</strong></p><h2>Introduction</h2><p>Streamlit in Snowflake allows users to build interactive applications directly within the Snowflake environment. This lab introduces how a simple data-entry form can collect user input and store it in a Snowflake table, connecting an application interface with database operations.</p><h2>Explanation</h2><p>A <code>FRUIT_DETAILS</code> table is created in the <code>GARDEN_PLANTS.FRUITS</code> schema to store fruit names and their corresponding root-depth codes.</p><p>A Streamlit in Snowflake application is then created using the same database and schema. The application contains:</p><ul><li><p>A text field for entering the fruit name</p></li><li><p>A selection box for choosing the root-depth code</p></li><li><p>A Submit button for inserting the entered values into the table</p></li></ul><p>Users submit several fruit records through the application and verify that the entries appear in the table’s data preview.</p>",
      "output": "<p><span><strong><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></strong></span></p><h2>Output</h2><p>After completing the lab successfully:</p><ul><li><p>The <code>GARDEN_PLANTS.FRUITS.FRUIT_DETAILS</code> table is created.</p></li><li><p>The Streamlit application displays a fruit-name field and root-depth selection box.</p></li><li><p>Clicking <strong>Submit</strong> inserts a new record into the table.</p></li><li><p>Multiple submitted records appear in the table preview.</p></li><li><p>The DORA grader for step <code>DWW09</code> returns a successful result when the account’s query history confirms that a Streamlit application in <code>GARDEN_PLANTS.FRUITS</code> has been executed.</p></li></ul>",
      "outputCode": "--Set your worksheet drop list role to ACCOUNTADMIN\n--Set your worksheet drop list database and schema to the location of your GRADER function\n\n-- DO NOT EDIT ANYTHING BELOW THIS LINE. THE CODE MUST BE RUN EXACTLY AS IT IS WRITTEN\nselect GRADER(step, (actual = expected), actual, expected, description) as graded_results from (\n SELECT 'DWW09' as step\n ,( select iff(count(*)=0, 0, count(*)/count(*)) \n    from snowflake.account_usage.query_history\n    where query_text like 'execute streamlit \"GARDEN_PLANTS\".\"FRUITS\".%'\n   ) as actual\n , 1 as expected\n ,'SiS App Works' as description\n); ",
      "flow": [
       {
        "id": "0d0d2a5076",
        "label": "Goto Lab Worksheet",
        "type": "process"
       },
       {
        "id": "c1dc3ac958",
        "label": "Create Fruit Details Table",
        "type": "process"
       },
       {
        "id": "084119dd67",
        "label": "Goto Workspace",
        "type": "start"
       },
       {
        "id": "0e688b34d5",
        "label": "Create StreamLit APP",
        "type": "process"
       },
       {
        "id": "375e9511f1",
        "label": "Replace Default Code ",
        "type": "process"
       },
       {
        "id": "420e00e02e",
        "label": "Run the APP",
        "type": "io"
       },
       {
        "id": "8e933b4983",
        "label": "Add Form Fields",
        "type": "process"
       },
       {
        "id": "962290e30b",
        "label": "Add Submit & DB logic",
        "type": "process"
       },
       {
        "id": "de1714bc64",
        "label": "Add 4-5 Fruits",
        "type": "io"
       },
       {
        "id": "d804f45165",
        "label": "Run DORA",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Create a SiS Form",
        "description": "<p><strong>Create a Fruit Details Table - Model it After the Other 2 Details Tables</strong></p>",
        "code": "CREATE OR REPLACE TABLE GARDEN_PLANTS.FRUITS.FRUIT_DETAILS\n(\n    PLANT_NAME VARCHAR(25),\n    ROOT_DEPTH_CODE VARCHAR(1)\n);",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "95bcd2af31",
          "html": "<p><strong>Create a Fruit Details Table - Model it After the Other 2 Details Tables</strong></p>"
         },
         {
          "type": "snippet",
          "id": "8565d69244",
          "lang": "sql",
          "code": "CREATE OR REPLACE TABLE GARDEN_PLANTS.FRUITS.FRUIT_DETAILS\n(\n    PLANT_NAME VARCHAR(25),\n    ROOT_DEPTH_CODE VARCHAR(1)\n);",
          "label": null
         }
        ]
       },
       {
        "title": "Create a Streamlit-in-Snowflake Data Entry Form",
        "description": "<ol><li><p>Open Snowflake and select Projects from the left-side navigation menu.</p></li><li><p>Choose Streamlit from the Projects menu.</p></li><li><p>Click + Streamlit App.</p></li><li><p>Enter the app title as Uncle Yers Root Depth Entry Form.</p></li><li><p>Select GARDEN_PLANTS as the database and FRUITS as the schema.</p></li><li><p>Select COMPUTE_WH as the app warehouse.</p></li><li><p>Click Create.</p></li></ol>",
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785255112387_Create_a_Streamlit-in-Snowflake_Data_Entry_Form_PPixMljZp.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "9ef1b70557",
          "html": "<ol><li><p>Open Snowflake and select Projects from the left-side navigation menu.</p></li><li><p>Choose Streamlit from the Projects menu.</p></li><li><p>Click + Streamlit App.</p></li><li><p>Enter the app title as Uncle Yers Root Depth Entry Form.</p></li><li><p>Select GARDEN_PLANTS as the database and FRUITS as the schema.</p></li><li><p>Select COMPUTE_WH as the app warehouse.</p></li><li><p>Click Create.</p></li></ol>"
         },
         {
          "type": "image",
          "id": "027932bfaf",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785255112387_Create_a_Streamlit-in-Snowflake_Data_Entry_Form_PPixMljZp.webp",
          "caption": null
         }
        ]
       },
       {
        "title": "after creating ,edit the steamlit app code",
        "description": "<p><span>On the code side of the screen, delete all code from line 18 to the end. Then click 'Run\" in the upper left corner.</span></p>",
        "code": "import streamlit as st\nimport os\n\n# Application heading and instructions\nst.title(\"🍎 Uncle Yer's Fruit Details 🍎\")\nst.write(\"Enter the fruit name and root-depth code below.\")\n\n# DB Session\nconn = st.connection(\n    \"snowflake\",\n    ttl=os.getenv(\"SNOWFLAKE_CONNECTION_TTL\")\n)\nsession = conn.session()\n",
        "codeLang": "python",
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785255664779_first_pic_of_streamlit_app_oeIejHMCp.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "87d9dca7d7",
          "html": "<p><span>On the code side of the screen, delete all code from line 18 to the end. Then click 'Run\" in the upper left corner.</span></p>"
         },
         {
          "type": "snippet",
          "id": "e292dca44f",
          "lang": "python",
          "code": "import streamlit as st\nimport os\n\n# Application heading and instructions\nst.title(\"🍎 Uncle Yer's Fruit Details 🍎\")\nst.write(\"Enter the fruit name and root-depth code below.\")\n\n# DB Session\nconn = st.connection(\n    \"snowflake\",\n    ttl=os.getenv(\"SNOWFLAKE_CONNECTION_TTL\")\n)\nsession = conn.session()\n",
          "label": null
         },
         {
          "type": "image",
          "id": "7782f040d8",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785255664779_first_pic_of_streamlit_app_oeIejHMCp.webp",
          "caption": null
         }
        ]
       },
       {
        "title": "Edit the Form Title & Instruction Line",
        "description": null,
        "code": "st.text_input('Fruit Name:')\nst.selectbox('Root Depth:', ('S','M','D'))",
        "codeLang": "python",
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785256192095_add_input_fields_in_stream_lit_app_qZX9AUs4j.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "b73cf0fc37",
          "lang": "python",
          "code": "st.text_input('Fruit Name:')\nst.selectbox('Root Depth:', ('S','M','D'))",
          "label": null
         },
         {
          "type": "image",
          "id": "ad91e5042a",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785256192095_add_input_fields_in_stream_lit_app_qZX9AUs4j.webp",
          "caption": null
         }
        ]
       },
       {
        "title": "add submit button and make entries",
        "description": "<p>Values submission logic</p>",
        "code": "fn = st.text_input('Fruit Name:')\nrdc = st.selectbox('Root Depth:', ('S','M','D'))\n\nif st.button('Submit'):\n   sql_insert = 'insert into garden_plants.fruits.fruit_details select \\''+fn+'\\',\\''+rdc+'\\''\n   result = session.sql(sql_insert)\n   st.write(result)",
        "codeLang": "python",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "c5a4b8e628",
          "html": "<p>Values submission logic</p>"
         },
         {
          "type": "snippet",
          "id": "022b3e9efc",
          "lang": "python",
          "code": "fn = st.text_input('Fruit Name:')\nrdc = st.selectbox('Root Depth:', ('S','M','D'))\n\nif st.button('Submit'):\n   sql_insert = 'insert into garden_plants.fruits.fruit_details select \\''+fn+'\\',\\''+rdc+'\\''\n   result = session.sql(sql_insert)\n   st.write(result)",
          "label": null
         }
        ]
       },
       {
        "title": "Add multiple Records",
        "description": "<p>make sure to see multiple entries in data preview</p>",
        "code": null,
        "codeLang": null,
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "dd48e72736",
          "html": "<p>make sure to see multiple entries in data preview</p>"
         }
        ]
       }
      ]
     },
     {
      "title": "Data Staging",
      "overview": null,
      "explanation": null,
      "output": "<p><span><strong><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></strong></span></p>",
      "outputCode": "--Set your worksheet drop list role to ACCOUNTADMIN\n--Set your worksheet drop list database and schema to the location of your GRADER function\n\n-- DO NOT EDIT ANYTHING BELOW THIS LINE. THE CODE MUST BE RUN EXACTLY AS IT IS WRITTEN\nselect GRADER(step, (actual = expected), actual, expected, description) as graded_results from (\n SELECT 'DWW10' as step\n  ,( \n    select count(*) \n    from UTIL_DB.INFORMATION_SCHEMA.stages\n    where stage_name='MY_INTERNAL_STAGE'\n    AND stage_type IS NULL\n    ) as actual\n  , 1 as expected\n  , 'Internal stage created' as description\n ); ",
      "flow": [
       {
        "id": "a0728adc07",
        "label": "Goto UTIL_DB > PUBLIC SCHEMA",
        "type": "start"
       },
       {
        "id": "c35b4cca86",
        "label": "Create 'my_internal_stage' STAGE",
        "type": "process"
       },
       {
        "id": "3e38584cbe",
        "label": "Verify Stage",
        "type": "decision"
       },
       {
        "id": "b1bb0ca186",
        "label": "Run DORA",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Create a Snowflake Stage Object",
        "description": "<ol><li><p>Open the UTIL_DB database and select the PUBLIC schema.</p></li><li><p>Click Create.</p></li><li><p>Select Stage and choose Snowflake Managed.</p></li><li><p>Enter the stage name as my_internal_stage.</p></li><li><p>Confirm that UTIL_DB.PUBLIC is selected as the stage location.</p></li><li><p>Enter the comment as a place to hold files before loading them.</p></li><li><p>Enable the Directory Table option.</p></li><li><p>Select Server-side encryption.</p></li><li><p>Click Create.</p></li></ol>",
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785257458597_Create_a_Snowflake_Stage_Object_Cl8_A3iyn.webp",
        "imageCaption": null,
        "blocks": []
       }
      ]
     }
    ]
   },
   {
    "title": "Data Staging",
    "order": 2,
    "linkUrl": null,
    "modules": [
     {
      "title": "Challenge Lab - DIY (Data Staging)",
      "overview": "<p><strong>Required Files :</strong></p><p>File 1 (Git):</p><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/atomcollectdsu-crypto/Snowflake-DWW-labfiles/blob/main/veg_plant_height.csv\"><span><mark data-color=\"#9900ff\">veg_plant_height.csv</mark></span></a></p>",
      "explanation": "<h2>Title</h2><p><strong>Challenge Lab: Loading Plant Height Data into Snowflake</strong></p><h2>Introduction</h2><p>This challenge lab allows learners to apply their knowledge of Snowflake data staging independently. It focuses on selecting appropriate table structures and file-format settings so that source data can be loaded accurately and validated using a DORA check.</p>",
      "output": "<h2>Output</h2><p>After completing the lab successfully:</p><ul><li><p>The <code>VEGETABLE_DETAILS_PLANT_HEIGHT</code> table is created.</p></li><li><p>The plant-height data is loaded from the staged CSV file.</p></li><li><p>The table contains <strong>41 records</strong>.</p></li><li><p>The DORA grader for step <code>DWW12</code> returns a successful result because the actual row count matches the expected row count of <code>41</code>.</p></li></ul><p><span><strong><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></strong></span></p>",
      "outputCode": "--Set your worksheet drop list role to ACCOUNTADMIN\n--Set your worksheet drop list database and schema to the location of your GRADER function\n\n-- DO NOT EDIT ANYTHING BELOW THIS LINE. THE CODE MUST BE RUN EXACTLY AS IT IS WRITTEN\nselect GRADER(step, (actual = expected), actual, expected, description) as graded_results from (  \n      SELECT 'DWW12' as step \n      ,( select row_count \n        from GARDEN_PLANTS.INFORMATION_SCHEMA.TABLES \n        where table_name = 'VEGETABLE_DETAILS_PLANT_HEIGHT') as actual \n      , 41 as expected \n      , 'Veg Detail Plant Height Count' as description   \n); ",
      "flow": [
       {
        "id": "b96b87d817",
        "label": "Download .csv File",
        "type": "start"
       },
       {
        "id": "7f85eac21d",
        "label": "Load file to 'MY_INTERNAL_STAGE' Staging",
        "type": "io"
       },
       {
        "id": "bfe828143e",
        "label": "Create 'VEGETABLE_DETAILS_PLANT_HEIGHT' Table",
        "type": "process"
       },
       {
        "id": "39fa18c545",
        "label": "Create File Format",
        "type": "process"
       },
       {
        "id": "59dee4d852",
        "label": "Copy Data from Staging to Table",
        "type": "io"
       },
       {
        "id": "ac51f2a5f1",
        "label": "Run DORA ",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Download the File",
        "description": "<p><span>Download:</span></p><p><span>veg_plant_height.csv</span></p><p><span>Do <strong>not</strong> edit the file.</span></p><p><br></p>",
        "code": "Open the File\n1.Open it using a text editor (Not Excel).\n2.The header row will look similar to:\n3.PLANT_NAME,ROOT_DEPTH_CODE,PLANT_HEIGHT,UNIT_OF_MEASURE\n        Note: Use the actual header names from your CSV file if they differ.\n",
        "codeLang": "text",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "772116f664",
          "html": "<p><span>Download:</span></p><p><span>veg_plant_height.csv</span></p><p><span>Do <strong>not</strong> edit the file.</span></p><p><br></p>"
         },
         {
          "type": "snippet",
          "id": "bccd97a39e",
          "lang": "text",
          "code": "Open the File\n1.Open it using a text editor (Not Excel).\n2.The header row will look similar to:\n3.PLANT_NAME,ROOT_DEPTH_CODE,PLANT_HEIGHT,UNIT_OF_MEASURE\n        Note: Use the actual header names from your CSV file if they differ.\n",
          "label": null
         }
        ]
       },
       {
        "title": "Create the Table",
        "description": "<p><span>Replace the column names below with the exact names from your CSV header if necessary.</span></p>",
        "code": "CREATE OR REPLACE TABLE GARDEN_PLANTS.VEGGIES.VEGETABLE_DETAILS_PLANT_HEIGHT\n(\n    PLANT_NAME VARCHAR(50),\n    ROOT_DEPTH_CODE VARCHAR(5),\n    PLANT_HEIGHT NUMBER,\n    UNIT_OF_MEASURE VARCHAR(20)\n);",
        "codeLang": "sql",
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785349010531_VEGETABLE_DETAILS_PLANT_HEIGHT_-_Challenge_Lab_-_DIY__Data_Staging__ydKMgjL8L.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "5044b2b76f",
          "html": "<p><span>Replace the column names below with the exact names from your CSV header if necessary.</span></p>"
         },
         {
          "type": "snippet",
          "id": "c802959e90",
          "lang": "sql",
          "code": "CREATE OR REPLACE TABLE GARDEN_PLANTS.VEGGIES.VEGETABLE_DETAILS_PLANT_HEIGHT\n(\n    PLANT_NAME VARCHAR(50),\n    ROOT_DEPTH_CODE VARCHAR(5),\n    PLANT_HEIGHT NUMBER,\n    UNIT_OF_MEASURE VARCHAR(20)\n);",
          "label": null
         },
         {
          "type": "snippet",
          "id": "336e4ac29b",
          "lang": "text",
          "code": "Navigate to\nCatalog→ Databases → UTIL_DB → PUBLIC → MY_INTERNAL_STAGE\n                   Click + Files\n                 Browse and select\n1. veg_plant_height.csv\n2. Click Upload.\n3. Verify the file appears.\n",
          "label": null
         },
         {
          "type": "image",
          "id": "641d9db3b9",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785349010531_VEGETABLE_DETAILS_PLANT_HEIGHT_-_Challenge_Lab_-_DIY__Data_Staging__ydKMgjL8L.webp",
          "caption": null
         }
        ]
       },
       {
        "title": "Choose the Correct File Format",
        "description": "<p><span>Use the existing file format created earlier: COMMASEP_DBLQUOT_ONEHEADROW</span></p><p><span>because</span></p><ul><li><p><span>CSV file</span></p></li><li><p><span>Comma separated</span></p></li><li><p><span>One header row</span></p></li><li><p><span>Double quotes around text (if present)<br></span></p></li></ul>",
        "code": "CREATE OR REPLACE FILE FORMAT\n    GARDEN_PLANTS.VEGGIES.COMMASEP_DBLQUOT_ONEHEADROW\n    TYPE = 'CSV'\n    FIELD_DELIMITER = ','\n    SKIP_HEADER = 1\n    FIELD_OPTIONALLY_ENCLOSED_BY = '\"';\n",
        "codeLang": "sql",
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785349126929_Challenge_Lab_-_DIY__Data_Staging__-_FF_VI465r8cD.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "be3710da35",
          "html": "<p><span>Use the existing file format created earlier: COMMASEP_DBLQUOT_ONEHEADROW</span></p><p><span>because</span></p><ul><li><p><span>CSV file</span></p></li><li><p><span>Comma separated</span></p></li><li><p><span>One header row</span></p></li><li><p><span>Double quotes around text (if present)<br></span></p></li></ul>"
         },
         {
          "type": "snippet",
          "id": "c0294afb4e",
          "lang": "sql",
          "code": "CREATE OR REPLACE FILE FORMAT\n    GARDEN_PLANTS.VEGGIES.COMMASEP_DBLQUOT_ONEHEADROW\n    TYPE = 'CSV'\n    FIELD_DELIMITER = ','\n    SKIP_HEADER = 1\n    FIELD_OPTIONALLY_ENCLOSED_BY = '\"';\n",
          "label": null
         },
         {
          "type": "image",
          "id": "ee4821d1bb",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785349126929_Challenge_Lab_-_DIY__Data_Staging__-_FF_VI465r8cD.webp",
          "caption": null
         }
        ]
       },
       {
        "title": "Load the File",
        "description": null,
        "code": "COPY INTO GARDEN_PLANTS.VEGGIES.VEGETABLE_DETAILS_PLANT_HEIGHT\nFROM @UTIL_DB.PUBLIC.MY_INTERNAL_STAGE\nFILES = ('veg_plant_height.csv')\nFILE_FORMAT = (\n    FORMAT_NAME =\n        GARDEN_PLANTS.VEGGIES.COMMASEP_DBLQUOT_ONEHEADROW\n);\n",
        "codeLang": "sql",
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785349218403_Challenge_Lab_-_DIY__Data_Staging__-_LOAD_FILE_ereZZxVDE.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "6c14cb656a",
          "lang": "sql",
          "code": "COPY INTO GARDEN_PLANTS.VEGGIES.VEGETABLE_DETAILS_PLANT_HEIGHT\nFROM @UTIL_DB.PUBLIC.MY_INTERNAL_STAGE\nFILES = ('veg_plant_height.csv')\nFILE_FORMAT = (\n    FORMAT_NAME =\n        GARDEN_PLANTS.VEGGIES.COMMASEP_DBLQUOT_ONEHEADROW\n);\n",
          "label": null
         },
         {
          "type": "image",
          "id": "d7b7173235",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785349218403_Challenge_Lab_-_DIY__Data_Staging__-_LOAD_FILE_ereZZxVDE.webp",
          "caption": null
         }
        ]
       }
      ]
     },
     {
      "title": "Staging .txt File (CSV DATA)",
      "overview": "<p><strong>Required Files :</strong></p><p>File 1 (Git):</p><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/atomcollectdsu-crypto/Snowflake-DWW-labfiles/blob/main/VEG_NAME_TO_SOIL_TYPE_PIPE.txt\"><span><mark data-color=\"#9900ff\">VEG_NAME_TO_SOIL_TYPE_PIPE.txt</mark></span></a></p>",
      "explanation": "<p><strong>Data Staging in Snowflake</strong></p><h2>Introduction</h2><p>Data staging is an important part of the data-ingestion process. It provides a temporary location where source files can be stored and prepared before their contents are transferred into Snowflake tables. This lab helps learners understand how Snowflake stages, file formats, and loading operations work together to import external data accurately and efficiently.</p><h2>Explanation</h2><p>In this lab, a pipe-delimited text file is placed in a Snowflake internal stage. A suitable table and file format are then created to interpret the structure of the file correctly. The staged data is loaded into the destination table using the <code>COPY INTO</code> command.</p><p>The file format tells Snowflake that the pipe symbol <code>|</code> separates the columns and that the first row contains a header that should not be loaded. The completed table stores vegetable names along with their corresponding soil-type values.</p>",
      "output": "<p>After completing the lab successfully:</p><ol><li><p>The <code>VEGETABLE_DETAILS_SOIL_TYPE</code> table is created in the <code>GARDEN_PLANTS.VEGGIES</code> schema.</p></li><li><p>The staged file is loaded into the table.</p></li><li><p>The table contains <strong>42 records</strong>.</p></li><li><p>The DORA check for step <code>DWW11</code> returns a successful result because the actual row count matches the expected count of <code>42</code>.</p></li></ol>",
      "outputCode": null,
      "flow": [
       {
        "id": "0e642a964a",
        "label": "Download .txt File",
        "type": "start"
       },
       {
        "id": "6427490a9a",
        "label": "Load .txt a File into Your Stage",
        "type": "io"
       },
       {
        "id": "a937343eec",
        "label": "Create a Table for Soil Types Table",
        "type": "process"
       },
       {
        "id": "161e54072a",
        "label": "Create File Format",
        "type": "process"
       },
       {
        "id": "c98d08bdf9",
        "label": "Copy Data to Table",
        "type": "io"
       },
       {
        "id": "581df6b2df",
        "label": "Verify Records",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Load a File into Your Stage",
        "description": "<p><strong>Download a File</strong></p><p><strong>&amp; Upload It To Your Stage</strong></p>",
        "code": "1.Download the file named VEG_NAME_TO_SOIL_TYPE_PIPE.txt.\n2.Open the UTIL_DB database and select the PUBLIC schema.\n3.Open the MY_INTERNAL_STAGE internal stage.\n    Click + Files.\n4.In the Upload Your Files window, click Browse.\n5.Select the VEG_NAME_TO_SOIL_TYPE_PIPE.txt file from your computer.\n6.Confirm that the selected location is UTIL_DB.PUBLIC.MY_INTERNAL_STAGE.\n7.Click Upload.",
        "codeLang": "text",
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785258527314_Load_a_File_into_Your_Stage_5n9jFalHS.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "3cad6b94bd",
          "html": "<p><strong>Download a File</strong></p><p><strong>&amp; Upload It To Your Stage</strong></p>"
         },
         {
          "type": "snippet",
          "id": "6a43bd8a43",
          "lang": "text",
          "code": "1.Download the file named VEG_NAME_TO_SOIL_TYPE_PIPE.txt.\n2.Open the UTIL_DB database and select the PUBLIC schema.\n3.Open the MY_INTERNAL_STAGE internal stage.\n    Click + Files.\n4.In the Upload Your Files window, click Browse.\n5.Select the VEG_NAME_TO_SOIL_TYPE_PIPE.txt file from your computer.\n6.Confirm that the selected location is UTIL_DB.PUBLIC.MY_INTERNAL_STAGE.\n7.Click Upload.",
          "label": null
         },
         {
          "type": "image",
          "id": "e5f09d3825",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785258527314_Load_a_File_into_Your_Stage_5n9jFalHS.webp",
          "caption": null
         }
        ]
       },
       {
        "title": "Create a Table for Soil Types",
        "description": "<p><span>Make sure you create it in the GARDEN_PLANTS database, in the VEGGIES schema.</span></p>",
        "code": "create or replace table vegetable_details_soil_type\n( plant_name varchar(25)\n ,soil_type number(1,0)\n);",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "dfc0f9334c",
          "html": "<p><span>Make sure you create it in the GARDEN_PLANTS database, in the VEGGIES schema.</span></p>"
         },
         {
          "type": "snippet",
          "id": "d3cef95be0",
          "lang": "sql",
          "code": "create or replace table vegetable_details_soil_type\n( plant_name varchar(25)\n ,soil_type number(1,0)\n);",
          "label": null
         },
         {
          "type": "snippet",
          "id": "55989f2392",
          "lang": "sql",
          "code": "create file format garden_plants.veggies.PIPECOLSEP_ONEHEADROW \n    type = 'CSV'--csv is used for any flat file (tsv, pipe-separated, etc)\n    field_delimiter = '|' --pipes as column separators\n    skip_header = 1 --one header row to skip;",
          "label": null
         },
         {
          "type": "snippet",
          "id": "8045fdcfe6",
          "lang": "sql",
          "code": "COPY INTO GARDEN_PLANTS.VEGGIES.VEGETABLE_DETAILS_SOIL_TYPE\nFROM @UTIL_DB.PUBLIC.MY_INTERNAL_STAGE\nFILES = ('VEG_NAME_TO_SOIL_TYPE_PIPE.txt')\nFILE_FORMAT = (\n    FORMAT_NAME = GARDEN_PLANTS.VEGGIES.PIPECOLSEP_ONEHEADROW\n);",
          "label": null
         }
        ]
       },
       {
        "title": "Dora check",
        "description": "<h2><span><strong><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></strong></span></h2>",
        "code": "--Set your worksheet drop list role to ACCOUNTADMIN\n--Set your worksheet drop list database and schema to the location of your GRADER function\n\n-- DO NOT EDIT ANYTHING BELOW THIS LINE. THE CODE MUST BE RUN EXACTLY AS IT IS WRITTEN\nselect GRADER(step, (actual = expected), actual, expected, description) as graded_results from (\n  SELECT 'DWW11' as step\n  ,( select row_count \n    from GARDEN_PLANTS.INFORMATION_SCHEMA.TABLES \n    where table_name = 'VEGETABLE_DETAILS_SOIL_TYPE') as actual\n  , 42 as expected\n  , 'Veg Det Soil Type Count' as description\n ); ",
        "codeLang": "sql",
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785346424260_DORA11_fPnIhQPqV.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "539e281119",
          "html": "<h2><span><strong><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></strong></span></h2>"
         },
         {
          "type": "snippet",
          "id": "c031357852",
          "lang": "sql",
          "code": "--Set your worksheet drop list role to ACCOUNTADMIN\n--Set your worksheet drop list database and schema to the location of your GRADER function\n\n-- DO NOT EDIT ANYTHING BELOW THIS LINE. THE CODE MUST BE RUN EXACTLY AS IT IS WRITTEN\nselect GRADER(step, (actual = expected), actual, expected, description) as graded_results from (\n  SELECT 'DWW11' as step\n  ,( select row_count \n    from GARDEN_PLANTS.INFORMATION_SCHEMA.TABLES \n    where table_name = 'VEGETABLE_DETAILS_SOIL_TYPE') as actual\n  , 42 as expected\n  , 'Veg Det Soil Type Count' as description\n ); ",
          "label": null
         },
         {
          "type": "image",
          "id": "c8b94c482e",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785346424260_DORA11_fPnIhQPqV.webp",
          "caption": null
         }
        ]
       }
      ]
     },
     {
      "title": "Staging .tsv File",
      "overview": "<p><strong>Required Files :</strong></p><p>File 1 (Git):</p><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/atomcollectdsu-crypto/Snowflake-DWW-labfiles/blob/main/LU_SOIL_TYPE.tsv\"><span><mark data-color=\"#9900ff\">LU_SOIL_TYPE.tsv</mark></span></a></p>",
      "explanation": "<h2>Title</h2><p><strong>Querying and Loading a Staged File in Snowflake</strong></p><h2>Introduction</h2><p>Before loading data into a Snowflake table, it is useful to examine the source file and confirm that Snowflake interprets its columns correctly. This lab introduces the process of validating staged data and transferring it into a structured lookup table for further use.</p>",
      "output": "<p>After successful completion:</p><ul><li><p>The staged file preview displays three columns.</p></li><li><p>The <code>LU_SOIL_TYPE</code> lookup table is created.</p></li><li><p>The soil-type records are loaded into the table.</p></li><li><p>The <code>COPY INTO</code> command displays the file-loading status and the number of rows loaded.</p></li></ul>",
      "outputCode": null,
      "flow": [
       {
        "id": "5b44170b9b",
        "label": "Download .tsv File",
        "type": "start"
       },
       {
        "id": "8252cbfe29",
        "label": "Load .tsv a File into Your Stage",
        "type": "io"
       },
       {
        "id": "11c8b29222",
        "label": "Create a Table 'LU_SOIL_TYPE'",
        "type": "process"
       },
       {
        "id": "14dd2b6475",
        "label": "Create File Format",
        "type": "process"
       },
       {
        "id": "74f3eff2fd",
        "label": "Copy Data to Table",
        "type": "io"
       },
       {
        "id": "c34eb9564b",
        "label": "Verify Records",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Query a File Before You Load It",
        "description": "<ul><li><p>Download the file named LU_SOIL_TYPE.tsv.</p></li><li><p>Open the UTIL_DB.PUBLIC.MY_INTERNAL_STAGE internal stage.</p></li><li><p>Click + Files and upload the LU_SOIL_TYPE.tsv file.</p></li><li><p>Open a Snowflake SQL worksheet.</p></li><li><p>Run the following command to create a comma-separated file format:</p></li></ul>",
        "code": "CREATE OR REPLACE FILE FORMAT GARDEN_PLANTS.VEGGIES.L9_CHALLENGE_FF\n TYPE='CSV'\n FIELD_DELIMITER='\\t'\n SKIP_HEADER=1;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "9b2513dd6d",
          "html": "<ul><li><p>Download the file named LU_SOIL_TYPE.tsv.</p></li><li><p>Open the UTIL_DB.PUBLIC.MY_INTERNAL_STAGE internal stage.</p></li><li><p>Click + Files and upload the LU_SOIL_TYPE.tsv file.</p></li><li><p>Open a Snowflake SQL worksheet.</p></li><li><p>Run the following command to create a comma-separated file format:</p></li></ul>"
         },
         {
          "type": "snippet",
          "id": "7e741156c8",
          "lang": "sql",
          "code": "CREATE OR REPLACE FILE FORMAT GARDEN_PLANTS.VEGGIES.L9_CHALLENGE_FF\n TYPE='CSV'\n FIELD_DELIMITER='\\t'\n SKIP_HEADER=1;",
          "label": null
         },
         {
          "type": "snippet",
          "id": "5a2484e2e8",
          "lang": "sql",
          "code": "CREATE OR REPLACE TABLE LU_SOIL_TYPE(\n SOIL_TYPE_ID NUMBER,\n SOIL_TYPE VARCHAR(15),\n SOIL_DESCRIPTION VARCHAR(75)\n );\n",
          "label": null
         },
         {
          "type": "snippet",
          "id": "8924bf8a34",
          "lang": "sql",
          "code": "COPY INTO LU_SOIL_TYPE\n FROM @util_db.public.my_internal_stage\n FILES=('LU_SOIL_TYPE.tsv')\n FILE_FORMAT=(FORMAT_NAME=GARDEN_PLANTS.VEGGIES.L9_CHALLENGE_FF);\n",
          "label": null
         }
        ]
       }
      ]
     },
     {
      "title": "DORA challenge",
      "overview": null,
      "explanation": "<p>Lab Checks for DORA 13 &amp; DORA 14</p>",
      "output": "<p>Run DORA 13 &amp; Verify Output</p><p>Run DORA 14 &amp; Verify Output</p>",
      "outputCode": null,
      "flow": [
       {
        "id": "3805ed749c",
        "label": "Goto DORA Worksheet",
        "type": "start"
       },
       {
        "id": "fc4c9c3fe1",
        "label": "Run DORA 13",
        "type": "io"
       },
       {
        "id": "a9d4a02339",
        "label": "Run DORA 14",
        "type": "io"
       },
       {
        "id": "d069d0e17f",
        "label": "Verify Output",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "DORA 13",
        "description": "<p><span><strong><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></strong></span></p>",
        "code": "--Set your worksheet drop list role to ACCOUNTADMIN\n--Set your worksheet drop list database and schema to the location of your GRADER function\n\n-- DO NOT EDIT ANYTHING BELOW THIS LINE. THE CODE MUST BE RUN EXACTLY AS IT IS WRITTEN\nselect GRADER(step, (actual = expected), actual, expected, description) as graded_results from (  \n     SELECT 'DWW13' as step \n     ,( select row_count \n       from GARDEN_PLANTS.INFORMATION_SCHEMA.TABLES \n       where table_name = 'LU_SOIL_TYPE') as actual \n     , 8 as expected \n     ,'Soil Type Look Up Table' as description   \n); ",
        "codeLang": "sql",
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785350082523_DORA_13_axd9bXpKA.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "f2bee622a6",
          "html": "<p><span><strong><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></strong></span></p>"
         },
         {
          "type": "snippet",
          "id": "9897bb92c7",
          "lang": "sql",
          "code": "--Set your worksheet drop list role to ACCOUNTADMIN\n--Set your worksheet drop list database and schema to the location of your GRADER function\n\n-- DO NOT EDIT ANYTHING BELOW THIS LINE. THE CODE MUST BE RUN EXACTLY AS IT IS WRITTEN\nselect GRADER(step, (actual = expected), actual, expected, description) as graded_results from (  \n     SELECT 'DWW13' as step \n     ,( select row_count \n       from GARDEN_PLANTS.INFORMATION_SCHEMA.TABLES \n       where table_name = 'LU_SOIL_TYPE') as actual \n     , 8 as expected \n     ,'Soil Type Look Up Table' as description   \n); ",
          "label": null
         },
         {
          "type": "image",
          "id": "a13edca265",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785350082523_DORA_13_axd9bXpKA.webp",
          "caption": null
         }
        ]
       },
       {
        "title": "DORA 14",
        "description": "<p><span><strong><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></strong></span></p>",
        "code": "-- Set your worksheet drop lists\n-- DO NOT EDIT THE CODE \nselect GRADER(step, (actual = expected), actual, expected, description) as graded_results from ( \n     SELECT 'DWW14' as step \n     ,( select count(*) \n       from GARDEN_PLANTS.INFORMATION_SCHEMA.FILE_FORMATS \n       where FILE_FORMAT_NAME='L9_CHALLENGE_FF' \n       and FIELD_DELIMITER = '\\t') as actual \n     , 1 as expected \n     ,'Challenge File Format Created' as description  \n); ",
        "codeLang": "sql",
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785350164261_DORA_14_cOoYKxVzn.webp",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "ebaa5a2a65",
          "html": "<p><span><strong><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></strong></span></p>"
         },
         {
          "type": "snippet",
          "id": "b14747ae7e",
          "lang": "sql",
          "code": "-- Set your worksheet drop lists\n-- DO NOT EDIT THE CODE \nselect GRADER(step, (actual = expected), actual, expected, description) as graded_results from ( \n     SELECT 'DWW14' as step \n     ,( select count(*) \n       from GARDEN_PLANTS.INFORMATION_SCHEMA.FILE_FORMATS \n       where FILE_FORMAT_NAME='L9_CHALLENGE_FF' \n       and FIELD_DELIMITER = '\\t') as actual \n     , 1 as expected \n     ,'Challenge File Format Created' as description  \n); ",
          "label": null
         },
         {
          "type": "image",
          "id": "bf76acef69",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785350164261_DORA_14_cOoYKxVzn.webp",
          "caption": null
         }
        ]
       }
      ]
     },
     {
      "title": "REAL WORLD SCENARIO - I",
      "overview": null,
      "explanation": "<p><span><strong>Sequences and Relationships</strong></span></p>",
      "output": "<p><span><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></span></p>",
      "outputCode": "-- Set your worksheet drop lists\n-- DO NOT EDIT THE CODE \nselect GRADER(step, (actual = expected), actual, expected, description) as graded_results from (  \n     SELECT 'DWW15' as step \n     ,( select count(*) \n      from LIBRARY_CARD_CATALOG.PUBLIC.Book_to_Author ba \n      join LIBRARY_CARD_CATALOG.PUBLIC.author a \n      on ba.author_uid = a.author_uid \n      join LIBRARY_CARD_CATALOG.PUBLIC.book b \n      on b.book_uid=ba.book_uid) as actual \n     , 6 as expected \n     , '3NF DB was Created.' as description  \n);\n",
      "flow": [
       {
        "id": "bbe261a50c",
        "label": "Goto Catalog > Databases",
        "type": "start"
       },
       {
        "id": "4f89f0e377",
        "label": "Create 'LIBRARY_CARD_CATALOG' DB",
        "type": "process"
       },
       {
        "id": "ace7a687b2",
        "label": "Create 'BOOK' Table & Insert Data",
        "type": "process"
       },
       {
        "id": "0bba0af1d9",
        "label": "Create 'AUTHOR' Table",
        "type": "process"
       },
       {
        "id": "ff6be847d0",
        "label": "Insert values to 'AUTHOR'",
        "type": "io"
       },
       {
        "id": "e751c8bf78",
        "label": "Create SEQUENCE ",
        "type": "process"
       },
       {
        "id": "cd3ffd3487",
        "label": "Insert more values to 'AUTHOR'",
        "type": "io"
       },
       {
        "id": "0d238bfc66",
        "label": "Create 'BOOK_TO_AUTHOR' Table ",
        "type": "process"
       },
       {
        "id": "525f78a866",
        "label": "Insert values 'BOOK_TO_AUTHOR' (Relationship)",
        "type": "io"
       },
       {
        "id": "139c0bb92a",
        "label": "Run DORA",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Library Card Catalog DB",
        "description": "<p>Create new Database 'LIBRARY_CARD_CATALOG' FOR LIBRARY</p>",
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785359022369_REAL_WORLD_SCENARIO_-_1_-_DB_N9xy9otsm.webp",
        "imageCaption": null,
        "blocks": []
       },
       {
        "title": "Create BOOK , Author Table and thier relations",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785359120757_REAL_WORLD_SCENARIO_-_1_-_Book_JjyocBgvC.webp",
        "imageCaption": null,
        "blocks": []
       },
       {
        "title": "Create AUTHOR Table & Insert Authors Data",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785359236512_REAL_WORLD_SCENARIO_-_1_-_Author_pgE10F77H.webp",
        "imageCaption": null,
        "blocks": []
       },
       {
        "title": "Create Sequence",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785359313669_REAL_WORLD_SCENARIO_-_1_-_SEQ_mgz1cHJ_-.webp",
        "imageCaption": null,
        "blocks": []
       },
       {
        "title": "Insert Remaining Authors",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785359384738_REAL_WORLD_SCENARIO_-_1_-_SEQ_-REC_lC6nxvDBh.webp",
        "imageCaption": null,
        "blocks": []
       },
       {
        "title": "Create Relationship Table",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785359523214_REAL_WORLD_SCENARIO_-_1_-_REL_9ygGPS9Ap.webp",
        "imageCaption": null,
        "blocks": []
       }
      ]
     },
     {
      "title": "REAL WORLD SCENARIO - II",
      "overview": "<p><strong>Required Files :</strong></p><p>File 1 (Git):</p><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/atomcollectdsu-crypto/Snowflake-DWW-labfiles/blob/main/author_with_header.json\"><span><mark data-color=\"#9900ff\">author_with_header.json</mark></span></a></p>",
      "explanation": "<p><span><strong>Explanation</strong></span></p><p>Create JSON Table &amp; File Format, and Load the File</p>",
      "output": "<p><span><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></span></p>",
      "outputCode": "-- Set your worksheet drop lists. DO NOT EDIT THE DORA CODE.\nselect GRADER(step, (actual = expected), actual, expected, description) as graded_results from\n(\n  SELECT 'DWW16' as step\n  ,( select row_count \n    from LIBRARY_CARD_CATALOG.INFORMATION_SCHEMA.TABLES \n    where table_name = 'AUTHOR_INGEST_JSON') as actual\n  ,6 as expected\n  ,'Check number of rows' as description\n );",
      "flow": [
       {
        "id": "89c7f59b4b",
        "label": "Download .json File",
        "type": "start"
       },
       {
        "id": "9feae06f09",
        "label": "Upload .json file to Internal Staging",
        "type": "io"
       },
       {
        "id": "684e561a11",
        "label": "Create 'AUTHOR_INGEST_JSON' Table",
        "type": "process"
       },
       {
        "id": "25d61e9088",
        "label": "Create 'JSON_FILE_FORMAT' File Format",
        "type": "process"
       },
       {
        "id": "7ebccb91c9",
        "label": "Preview .json File Records",
        "type": "process"
       },
       {
        "id": "8830cedc0b",
        "label": "Copy data to 'AUTHOR_INGEST_JSON' Table",
        "type": "io"
       },
       {
        "id": "f27f53fa7c",
        "label": "Validate the loaded rows",
        "type": "decision"
       },
       {
        "id": "1fb5ab3918",
        "label": "Run DORA",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Download the file named \"author_with_header.json\"",
        "description": "<p><span>Download the .json file </span>and it should be in the stage UTIL_DB.PUBLIC.MY_INTERNAL_STAGE.</p><p>After downloading , view the file and view the data inside</p>",
        "code": "USE ROLE SYSADMIN;\nLIST @UTIL_DB.PUBLIC.MY_INTERNAL_STAGE;",
        "codeLang": "text",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "a2350b8d57",
          "html": "<p><span>Download the .json file </span>and it should be in the stage UTIL_DB.PUBLIC.MY_INTERNAL_STAGE.</p><p>After downloading , view the file and view the data inside</p>"
         },
         {
          "type": "snippet",
          "id": "be6f5c7fcf",
          "lang": "text",
          "code": "USE ROLE SYSADMIN;\nLIST @UTIL_DB.PUBLIC.MY_INTERNAL_STAGE;",
          "label": null
         },
         {
          "type": "snippet",
          "id": "f76b4a3650",
          "lang": "sql",
          "code": "USE ROLE SYSADMIN;\nUSE DATABASE LIBRARY_CARD_CATALOG;\nUSE SCHEMA PUBLIC;\n\nCREATE OR REPLACE TABLE AUTHOR_INGEST_JSON\n(\n  RAW_AUTHOR VARIANT\n);",
          "label": null
         },
         {
          "type": "snippet",
          "id": "c4aebbd78c",
          "lang": "sql",
          "code": "CREATE OR REPLACE FILE FORMAT LIBRARY_CARD_CATALOG.PUBLIC.JSON_FILE_FORMAT\n  TYPE = 'JSON'\n  COMPRESSION = 'AUTO'\n  ENABLE_OCTAL = FALSE\n  ALLOW_DUPLICATE = FALSE\n  STRIP_OUTER_ARRAY = TRUE\n  STRIP_NULL_VALUES = FALSE\n  IGNORE_UTF8_ERRORS = FALSE;",
          "label": null
         },
         {
          "type": "snippet",
          "id": "afb38f8bb8",
          "lang": "sql",
          "code": "SELECT $1\nFROM @UTIL_DB.PUBLIC.MY_INTERNAL_STAGE/author_with_header.json\n  (FILE_FORMAT => LIBRARY_CARD_CATALOG.PUBLIC.JSON_FILE_FORMAT);",
          "label": null
         }
        ]
       },
       {
        "title": "Load the JSON file",
        "description": "<p>Expected:</p><p>The COPY result should show LOADED, with six rows parsed and six rows loaded.</p>",
        "code": "COPY INTO LIBRARY_CARD_CATALOG.PUBLIC.AUTHOR_INGEST_JSON\nFROM @UTIL_DB.PUBLIC.MY_INTERNAL_STAGE/author_with_header.json\nFILE_FORMAT = (FORMAT_NAME = LIBRARY_CARD_CATALOG.PUBLIC.JSON_FILE_FORMAT);",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "20420ac54d",
          "html": "<p>Expected:</p><p>The COPY result should show LOADED, with six rows parsed and six rows loaded.</p>"
         },
         {
          "type": "snippet",
          "id": "f269fe120b",
          "lang": "sql",
          "code": "COPY INTO LIBRARY_CARD_CATALOG.PUBLIC.AUTHOR_INGEST_JSON\nFROM @UTIL_DB.PUBLIC.MY_INTERNAL_STAGE/author_with_header.json\nFILE_FORMAT = (FORMAT_NAME = LIBRARY_CARD_CATALOG.PUBLIC.JSON_FILE_FORMAT);",
          "label": null
         }
        ]
       },
       {
        "title": "Validate the loaded rows",
        "description": null,
        "code": "SELECT COUNT(*) AS ROW_COUNT\nFROM LIBRARY_CARD_CATALOG.PUBLIC.AUTHOR_INGEST_JSON;\n\nSELECT RAW_AUTHOR\nFROM LIBRARY_CARD_CATALOG.PUBLIC.AUTHOR_INGEST_JSON;\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "6a4d0a8200",
          "lang": "sql",
          "code": "SELECT COUNT(*) AS ROW_COUNT\nFROM LIBRARY_CARD_CATALOG.PUBLIC.AUTHOR_INGEST_JSON;\n\nSELECT RAW_AUTHOR\nFROM LIBRARY_CARD_CATALOG.PUBLIC.AUTHOR_INGEST_JSON;\n",
          "label": null
         }
        ]
       }
      ]
     },
     {
      "title": "REAL WORLD SCENARIO - III",
      "overview": "<p><strong>Required Files :</strong></p><p>File 1 (Git):</p><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/atomcollectdsu-crypto/Snowflake-DWW-labfiles/blob/main/json_book_author_nested.txt\"><span><mark data-color=\"#9900ff\">json_book_author_nested.txt</mark></span></a></p>",
      "explanation": "<p>Introduction</p><p>This lab focuses on loading nested book-and-author JSON data into Snowflake.</p><p>The nested JSON objects are stored in a VARIANT column, and the FLATTEN function is used to convert the nested authors array into queryable rows.</p>",
      "output": "<p>DORA 17</p>",
      "outputCode": "USE ROLE ACCOUNTADMIN;\nUSE DATABASE UTIL_DB;\nUSE SCHEMA PUBLIC;\n\nSELECT GRADER(step, (actual = expected), actual, expected, description) AS graded_results FROM (\n  SELECT 'DWW17' AS step,\n    (SELECT row_count\n     FROM LIBRARY_CARD_CATALOG.INFORMATION_SCHEMA.TABLES\n     WHERE table_name = 'NESTED_INGEST_JSON') AS actual,\n    5 AS expected,\n    'Check number of rows' AS description\n);",
      "flow": [
       {
        "id": "d5c8039ae3",
        "label": "Goto Lab Worksheet",
        "type": "start"
       },
       {
        "id": "76691ba85f",
        "label": "Confirm the JSON file format",
        "type": "process"
       },
       {
        "id": "bb9e43f31a",
        "label": "Download the JSON Data File for this Lab",
        "type": "process"
       },
       {
        "id": "15d809b9e1",
        "label": "Load the nested JSON",
        "type": "process"
       },
       {
        "id": "36a8eed6a3",
        "label": "Copy Data to 'NESTED_INGEST_JSON' Table",
        "type": "io"
       },
       {
        "id": "6ec6a67427",
        "label": "Run DORA",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Set the worksheet context",
        "description": null,
        "code": "USE ROLE SYSADMIN;\nUSE DATABASE LIBRARY_CARD_CATALOG;\nUSE SCHEMA PUBLIC;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "5fe16b1fe9",
          "lang": "sql",
          "code": "USE ROLE SYSADMIN;\nUSE DATABASE LIBRARY_CARD_CATALOG;\nUSE SCHEMA PUBLIC;",
          "label": null
         }
        ]
       },
       {
        "title": "Confirm the JSON file format",
        "description": "<p>Reuse the JSON_FILE_FORMAT created in the previous lesson. Its outer-array setting must be TRUE.</p><p>Confirm STRIP_OUTER_ARRAY is TRUE. If the format does not exist or the setting is incorrect, run the following block.</p>",
        "code": "DESC FILE FORMAT LIBRARY_CARD_CATALOG.PUBLIC.JSON_FILE_FORMAT;\nCREATE OR REPLACE FILE FORMAT LIBRARY_CARD_CATALOG.PUBLIC.JSON_FILE_FORMAT\n  TYPE = 'JSON'\n  COMPRESSION = 'AUTO'\n  ENABLE_OCTAL = FALSE\n  ALLOW_DUPLICATE = FALSE\n  STRIP_OUTER_ARRAY = TRUE\n  STRIP_NULL_VALUES = FALSE\n  IGNORE_UTF8_ERRORS = FALSE;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "daa9a00d19",
          "html": "<p>Reuse the JSON_FILE_FORMAT created in the previous lesson. Its outer-array setting must be TRUE.</p><p>Confirm STRIP_OUTER_ARRAY is TRUE. If the format does not exist or the setting is incorrect, run the following block.</p>"
         },
         {
          "type": "snippet",
          "id": "974e6ac67c",
          "lang": "sql",
          "code": "DESC FILE FORMAT LIBRARY_CARD_CATALOG.PUBLIC.JSON_FILE_FORMAT;\nCREATE OR REPLACE FILE FORMAT LIBRARY_CARD_CATALOG.PUBLIC.JSON_FILE_FORMAT\n  TYPE = 'JSON'\n  COMPRESSION = 'AUTO'\n  ENABLE_OCTAL = FALSE\n  ALLOW_DUPLICATE = FALSE\n  STRIP_OUTER_ARRAY = TRUE\n  STRIP_NULL_VALUES = FALSE\n  IGNORE_UTF8_ERRORS = FALSE;",
          "label": null
         }
        ]
       },
       {
        "title": "Download the JSON Data File for this Lab",
        "description": "<p>Upload json_book_author_nested.txt to UTIL_DB.PUBLIC.MY_INTERNAL_STAGE using Snowsight. Then confirm that Snowflake can see it.</p><p>Expected: The LIST result contains json_book_author_nested.txt.</p>",
        "code": "CREATE OR REPLACE TABLE LIBRARY_CARD_CATALOG.PUBLIC.NESTED_INGEST_JSON\n(\n  RAW_NESTED_BOOK VARIANT\n);\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "141996041e",
          "html": "<p>Upload json_book_author_nested.txt to UTIL_DB.PUBLIC.MY_INTERNAL_STAGE using Snowsight. Then confirm that Snowflake can see it.</p><p>Expected: The LIST result contains json_book_author_nested.txt.</p>"
         },
         {
          "type": "snippet",
          "id": "6097299caa",
          "lang": "sql",
          "code": "CREATE OR REPLACE TABLE LIBRARY_CARD_CATALOG.PUBLIC.NESTED_INGEST_JSON\n(\n  RAW_NESTED_BOOK VARIANT\n);\n",
          "label": null
         }
        ]
       },
       {
        "title": "Load the nested JSON",
        "description": "<p>Expected:</p><p>The COPY result shows LOADED, with 5 rows parsed</p><p>and 5 rows loaded.</p>",
        "code": "COPY INTO LIBRARY_CARD_CATALOG.PUBLIC.NESTED_INGEST_JSON\nFROM @UTIL_DB.PUBLIC.MY_INTERNAL_STAGE/json_book_author_nested.txt\nFILE_FORMAT = (\n  FORMAT_NAME = LIBRARY_CARD_CATALOG.PUBLIC.JSON_FILE_FORMAT\n);",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "8830e55a9a",
          "html": "<p>Expected:</p><p>The COPY result shows LOADED, with 5 rows parsed</p><p>and 5 rows loaded.</p>"
         },
         {
          "type": "snippet",
          "id": "731a78ea1d",
          "lang": "sql",
          "code": "COPY INTO LIBRARY_CARD_CATALOG.PUBLIC.NESTED_INGEST_JSON\nFROM @UTIL_DB.PUBLIC.MY_INTERNAL_STAGE/json_book_author_nested.txt\nFILE_FORMAT = (\n  FORMAT_NAME = LIBRARY_CARD_CATALOG.PUBLIC.JSON_FILE_FORMAT\n);",
          "label": null
         },
         {
          "type": "snippet",
          "id": "42652b7615",
          "lang": "sql",
          "code": "SELECT COUNT(*) AS ROW_COUNT\nFROM LIBRARY_CARD_CATALOG.PUBLIC.NESTED_INGEST_JSON;\n\nSELECT RAW_NESTED_BOOK\nFROM LIBRARY_CARD_CATALOG.PUBLIC.NESTED_INGEST_JSON;",
          "label": null
         }
        ]
       }
      ]
     },
     {
      "title": "Tweets Lab - JSON Format",
      "overview": "<p><strong>Required Files :</strong></p><p>File 1 (Git):</p><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/atomcollectdsu-crypto/Snowflake-DWW-labfiles/blob/main/nutrition_tweets.json\"><span><mark data-color=\"#9900ff\">nutrition_tweets.json</mark></span></a></p>",
      "explanation": "<p>online file viewer for JSON</p><p>Introduction</p><p>This lab demonstrates how social-media JSON data can be loaded and analysed in Snowflake. A dedicated database and ingestion table are created to store tweet records, including nested users, hashtags, URLs, and other tweet entities.</p>",
      "output": "<p>DORA 18</p><p>Expected Output</p><p>·       The SOCIAL_MEDIA_FLOODGATES database is created.</p><p>·       TWEET_INGEST is created in the PUBLIC schema.</p><p>·       The table contains exactly 9 tweet records .</p><p>·       Tweet dates, users, hashtags, and URLs can be accessed using JSON path notation.</p><p>·       Hashtag and URL arrays can be expanded using LATERAL FLATTEN .</p>",
      "outputCode": "USE ROLE ACCOUNTADMIN;\nUSE DATABASE UTIL_DB;\nUSE SCHEMA PUBLIC;\n\nSELECT GRADER(step, (actual = expected), actual, expected, description) AS graded_results FROM\n(\n  SELECT 'DWW18' AS step,\n    (SELECT row_count\n     FROM SOCIAL_MEDIA_FLOODGATES.INFORMATION_SCHEMA.TABLES\n     WHERE table_name = 'TWEET_INGEST') AS actual,\n    9 AS expected,\n    'Check number of rows' AS description\n);",
      "flow": [
       {
        "id": "658eab320d",
        "label": "Goto Lab Worksheet",
        "type": "start"
       },
       {
        "id": "690d4af7c3",
        "label": "Create 'SOCIAL_MEDIA_FLOODGATES' DB",
        "type": "process"
       },
       {
        "id": "605b5ab70e",
        "label": "Create 'TWEET_INGEST' Table",
        "type": "process"
       },
       {
        "id": "1af0b17ecf",
        "label": "Create 'TWEET_JSON_FILE_FORMAT'  File Format",
        "type": "process"
       },
       {
        "id": "381e39d332",
        "label": "Download .json File",
        "type": "process"
       },
       {
        "id": "035c0b77a5",
        "label": "Upload .json to Staging and Verify",
        "type": "io"
       },
       {
        "id": "c1ab8702e9",
        "label": "Query .json file data with File Format",
        "type": "process"
       },
       {
        "id": "34427b51f9",
        "label": "Copy Data to 'TWEET_INGEST' Table",
        "type": "io"
       },
       {
        "id": "4010a7d9bd",
        "label": "Validate TWEET_INGEST Records",
        "type": "decision"
       },
       {
        "id": "5e85b1e181",
        "label": "Normalise the Records",
        "type": "process"
       },
       {
        "id": "545e79be7c",
        "label": "Run DORA",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Create the database",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": null,
        "imageCaption": null,
        "blocks": []
       },
       {
        "title": "Load the tweet data",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": null,
        "imageCaption": null,
        "blocks": []
       },
       {
        "title": "Query nested tweet fields",
        "description": null,
        "code": null,
        "codeLang": null,
        "image": null,
        "imageCaption": null,
        "blocks": []
       }
      ]
     },
     {
      "title": "Tweets Lab - Normalize Hashtags",
      "overview": null,
      "explanation": null,
      "output": "<p>Run DORA</p><p>Expected Output</p><p>·       URLS_NORMALIZED is created to display URL information in a tabular structure.</p><p>·       HASHTAGS_NORMALIZED is created in SOCIAL_MEDIA_FLOODGATES.PUBLIC .</p><p>·       The hashtag view contains: USER_NAME TWEET_ID HASHTAG_USED</p><p>·       USER_NAME</p><p>·       TWEET_ID</p><p>·       HASHTAG_USED</p><p>·       Each hashtag appears as a separate row.</p><p>·       DORA check DWW19 confirms that the required view exists.</p>",
      "outputCode": "USE ROLE ACCOUNTADMIN;\nUSE DATABASE UTIL_DB;\nUSE SCHEMA PUBLIC;\n\nSELECT GRADER(step, (actual = expected), actual, expected, description) AS graded_results FROM\n(\n  SELECT 'DWW19' AS step,\n    (SELECT COUNT(*)\n     FROM SOCIAL_MEDIA_FLOODGATES.INFORMATION_SCHEMA.VIEWS\n     WHERE table_name = 'HASHTAGS_NORMALIZED') AS actual,\n    1 AS expected,\n    'Check number of rows' AS description\n);",
      "flow": [
       {
        "id": "a261241b63",
        "label": "Goto Worksheet",
        "type": "start"
       },
       {
        "id": "1baae2964a",
        "label": "Verify  tweet data records",
        "type": "decision"
       },
       {
        "id": "3747459c62",
        "label": "Create 'URLS_NORMALIZED' View",
        "type": "process"
       },
       {
        "id": "c7907b5357",
        "label": "Create 'HASHTAGS_NORMALIZED' View",
        "type": "process"
       },
       {
        "id": "8b3e22ebab",
        "label": "Run DORA",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Set the worksheet context",
        "description": null,
        "code": "USE ROLE SYSADMIN;\nUSE DATABASE SOCIAL_MEDIA_FLOODGATES;\nUSE SCHEMA PUBLIC;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "d33c5a8af1",
          "html": null
         },
         {
          "type": "snippet",
          "id": "a75696bb91",
          "lang": "sql",
          "code": "USE ROLE SYSADMIN;\nUSE DATABASE SOCIAL_MEDIA_FLOODGATES;\nUSE SCHEMA PUBLIC;",
          "label": null
         },
         {
          "type": "snippet",
          "id": "612543271f",
          "lang": "sql",
          "code": "SELECT COUNT(*) AS TWEET_ROWS\nFROM SOCIAL_MEDIA_FLOODGATES.PUBLIC.TWEET_INGEST;",
          "label": null
         }
        ]
       },
       {
        "title": "Create URLS_NORMALIZED",
        "description": null,
        "code": "-- Create a view named URLS_NORMALIZED\nCREATE OR REPLACE VIEW SOCIAL_MEDIA_FLOODGATES.PUBLIC.URLS_NORMALIZED AS\n\nSELECT\n\n    -- Get the user's name from the JSON data\n    RAW_STATUS:user:name::STRING AS USER_NAME,\n\n    -- Get the Tweet ID from the JSON data\n    RAW_STATUS:id::NUMBER AS TWEET_ID,\n\n    -- Get the display URL from each URL object\n    VALUE:display_url::STRING AS URL_USED\n\n-- Read data from the TWEET_INGEST table\nFROM SOCIAL_MEDIA_FLOODGATES.PUBLIC.TWEET_INGEST,\n\n-- Convert the URLs array into separate rows\nLATERAL FLATTEN(INPUT => RAW_STATUS:entities:urls);\n\n-- Display all records from the view\nSELECT *\nFROM SOCIAL_MEDIA_FLOODGATES.PUBLIC.URLS_NORMALIZED;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "7a217abf78",
          "lang": "sql",
          "code": "-- Create a view named URLS_NORMALIZED\nCREATE OR REPLACE VIEW SOCIAL_MEDIA_FLOODGATES.PUBLIC.URLS_NORMALIZED AS\n\nSELECT\n\n    -- Get the user's name from the JSON data\n    RAW_STATUS:user:name::STRING AS USER_NAME,\n\n    -- Get the Tweet ID from the JSON data\n    RAW_STATUS:id::NUMBER AS TWEET_ID,\n\n    -- Get the display URL from each URL object\n    VALUE:display_url::STRING AS URL_USED\n\n-- Read data from the TWEET_INGEST table\nFROM SOCIAL_MEDIA_FLOODGATES.PUBLIC.TWEET_INGEST,\n\n-- Convert the URLs array into separate rows\nLATERAL FLATTEN(INPUT => RAW_STATUS:entities:urls);\n\n-- Display all records from the view\nSELECT *\nFROM SOCIAL_MEDIA_FLOODGATES.PUBLIC.URLS_NORMALIZED;",
          "label": null
         }
        ]
       },
       {
        "title": "Create HASHTAGS_NORMALIZED",
        "description": null,
        "code": "CREATE OR REPLACE VIEW SOCIAL_MEDIA_FLOODGATES.PUBLIC.HASHTAGS_NORMALIZED AS\nSELECT\n    RAW_STATUS:user:name::STRING AS USER_NAME,\n    RAW_STATUS:id::NUMBER AS TWEET_ID,\n    VALUE:text::STRING AS HASHTAG_USED\nFROM SOCIAL_MEDIA_FLOODGATES.PUBLIC.TWEET_INGEST,\nLATERAL FLATTEN(INPUT => RAW_STATUS:entities:hashtags);\n\nSELECT\n    RAW_STATUS:user:name::STRING AS USER_NAME,\n    RAW_STATUS:id::NUMBER AS TWEET_ID,\n    VALUE:text::STRING AS HASHTAG_USED\nFROM SOCIAL_MEDIA_FLOODGATES.PUBLIC.TWEET_INGEST,\nLATERAL FLATTEN(INPUT => RAW_STATUS:entities:hashtags);",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "7fa5ed0198",
          "lang": "sql",
          "code": "CREATE OR REPLACE VIEW SOCIAL_MEDIA_FLOODGATES.PUBLIC.HASHTAGS_NORMALIZED AS\nSELECT\n    RAW_STATUS:user:name::STRING AS USER_NAME,\n    RAW_STATUS:id::NUMBER AS TWEET_ID,\n    VALUE:text::STRING AS HASHTAG_USED\nFROM SOCIAL_MEDIA_FLOODGATES.PUBLIC.TWEET_INGEST,\nLATERAL FLATTEN(INPUT => RAW_STATUS:entities:hashtags);\n\nSELECT\n    RAW_STATUS:user:name::STRING AS USER_NAME,\n    RAW_STATUS:id::NUMBER AS TWEET_ID,\n    VALUE:text::STRING AS HASHTAG_USED\nFROM SOCIAL_MEDIA_FLOODGATES.PUBLIC.TWEET_INGEST,\nLATERAL FLATTEN(INPUT => RAW_STATUS:entities:hashtags);",
          "label": null
         }
        ]
       }
      ]
     }
    ]
   }
  ]
 },
 {
  "title": "DATA ENGINEERING",
  "groupName": "SnowFlake",
  "color": "#0284c7",
  "labs": [
   {
    "title": "Project Kickoff",
    "order": 0,
    "linkUrl": "https://learn.snowflake.com/en/courses/OD-ESS-DNGW/",
    "modules": [
     {
      "title": "Set Up DORA!",
      "overview": null,
      "explanation": "<p><span>DORA (Snowflake's </span><strong>D</strong><span>iagnostic </span><strong>O</strong><span>nline </span><strong>R</strong><span>esults </span><strong>A</strong><span>ssessor) connects your trial account to various Snowflake systems that keep track of your course progress (including tracking DORA tests) and issue completion badges.</span></p>",
      "output": "<p>🧰 Let's Gooooooooo!</p><p>If you get a message saying the GRADER function doesn't exist , check to make sure your role is set to ACCOUNTADMIN in the upper right corner of the worksheet!</p><p>If you still get an error, search for \"GRADER\" using the search box in the Snowflake Worksheet Picker tab.</p><p>If you still get an error, confirm that you did the steps in the top section to set up the GRADER.</p>",
      "outputCode": null,
      "flow": [
       {
        "id": "c84d117788",
        "label": "Goto DORA Worksheet",
        "type": "start"
       },
       {
        "id": "5b84d95fcd",
        "label": "Create DORA API",
        "type": "process"
       },
       {
        "id": "42bd0855fa",
        "label": "Create Grader Function",
        "type": "process"
       },
       {
        "id": "541b2aefcc",
        "label": "Test DORA",
        "type": "io"
       },
       {
        "id": "889c1f1015",
        "label": "Verify the results",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Run the API Integration Script:",
        "description": "<p><span>This allows your trial account to communicate with the external Snowflake systems.</span></p>",
        "code": "use role accountadmin;\n\ncreate or replace api integration dora_api_integration\napi_provider = aws_api_gateway\napi_aws_role_arn = 'arn:aws:iam::321463406630:role/snowflakeLearnerAssumedRole'\nenabled = true\napi_allowed_prefixes = ('https://awy6hshxy4.execute-api.us-west-2.amazonaws.com/dev/edu_dora');\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "b0db017034",
          "html": "<p><span>This allows your trial account to communicate with the external Snowflake systems.</span></p>"
         },
         {
          "type": "snippet",
          "id": "8b3cebbdab",
          "lang": "sql",
          "code": "use role accountadmin;\n\ncreate or replace api integration dora_api_integration\napi_provider = aws_api_gateway\napi_aws_role_arn = 'arn:aws:iam::321463406630:role/snowflakeLearnerAssumedRole'\nenabled = true\napi_allowed_prefixes = ('https://awy6hshxy4.execute-api.us-west-2.amazonaws.com/dev/edu_dora');\n",
          "label": null
         }
        ]
       },
       {
        "title": "Set up the Grader Function",
        "description": null,
        "code": "//This allows your trial account to check your work against an answer key.\ncreate or replace external function util_db.public.grader(\n      step varchar\n    , passed boolean\n    , actual integer\n    , expected integer\n    , description varchar)\nreturns variant\napi_integration = dora_api_integration \ncontext_headers = (current_timestamp, current_account, current_statement, current_account_name) \nas 'https://awy6hshxy4.execute-api.us-west-2.amazonaws.com/dev/edu_dora/grader'\n; ",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "dae7d4031d",
          "html": null
         },
         {
          "type": "snippet",
          "id": "88a2d3d0d7",
          "lang": "sql",
          "code": "//This allows your trial account to check your work against an answer key.\ncreate or replace external function util_db.public.grader(\n      step varchar\n    , passed boolean\n    , actual integer\n    , expected integer\n    , description varchar)\nreturns variant\napi_integration = dora_api_integration \ncontext_headers = (current_timestamp, current_account, current_statement, current_account_name) \nas 'https://awy6hshxy4.execute-api.us-west-2.amazonaws.com/dev/edu_dora/grader'\n; ",
          "label": null
         },
         {
          "type": "image",
          "id": "b7112ab11e",
          "url": null,
          "caption": null
         }
        ]
       },
       {
        "title": "Test the connection",
        "description": null,
        "code": "use role accountadmin;\n\nselect util_db.public.grader(step, (actual = expected), actual, expected, description) as graded_results from\n(SELECT \n 'DORA_IS_WORKING' as step\n ,(select 123 ) as actual\n ,123 as expected\n ,'Dora is working!' as description\n); ",
        "codeLang": "sql",
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1786473510469_dngw_dora_working_FervCL2B0.png",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "2d26d4474c",
          "html": null
         },
         {
          "type": "snippet",
          "id": "9afc831607",
          "lang": "sql",
          "code": "use role accountadmin;\n\nselect util_db.public.grader(step, (actual = expected), actual, expected, description) as graded_results from\n(SELECT \n 'DORA_IS_WORKING' as step\n ,(select 123 ) as actual\n ,123 as expected\n ,'Dora is working!' as description\n); ",
          "label": null
         },
         {
          "type": "image",
          "id": "28965f5d5b",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1786473510469_dngw_dora_working_FervCL2B0.png",
          "caption": null
         }
        ]
       }
      ]
     },
     {
      "title": "Game Audience Log Ingestion",
      "overview": null,
      "explanation": "<p><span><strong><mark data-color=\"#ffffff\">GOAL  </mark></strong></span><span><mark data-color=\"#ffffff\">Load 250 JSON game-log records from S3, parse every attribute into typed columns, create RAW.LOGS, and pass DNGW01.</mark></span></p>",
      "output": "<p><span><strong>Run the DORA Check</strong></span></p><table><colgroup><col><col></colgroup><tbody><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"586\"><p><span><strong>CHECKPOINT  </strong></span><span>The GRADER result reports a pass for DNGW01.</span></p></td><td colspan=\"1\" rowspan=\"1\" colwidth=\"4\"><p><span> </span></p></td></tr></tbody></table><table><colgroup><col></colgroup><tbody><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"586\"><p><span><strong>DO NOT MODIFY  </strong></span><span>Keep the step code, object path, timestamp test, expected value, and description unchanged. Fix LOGS if grading fails.</span></p></td></tr></tbody></table>",
      "outputCode": "-- DO NOT EDIT THIS CODE\n SELECT GRADER(step, (actual = expected), actual, expected, description)\n    \tAS graded_results\n FROM (\n \tSELECT\n     \t'DNGW01' AS step,\n     \t(\n         \tSELECT COUNT(*)\n         \tFROM ags_game_audience.raw.logs\n         \tWHERE IS_TIMESTAMP_NTZ(TO_VARIANT(datetime_iso8601)) = TRUE\n     \t) AS actual,\n     \t250 AS expected,\n     \t'Project DB and Log File Set Up Correctly' AS description\n );",
      "flow": [
       {
        "id": "a25398285f",
        "label": "Goto Lab Work Sheet",
        "type": "start"
       },
       {
        "id": "80b911006a",
        "label": "Setup 'AGS_GAME_AUDIENCE' DB",
        "type": "process"
       },
       {
        "id": "f74d60c404",
        "label": "Create 'game_logs' Table",
        "type": "process"
       },
       {
        "id": "8ddc262975",
        "label": "Create External Staging (S3)",
        "type": "process"
       },
       {
        "id": "2a8c2d7d40",
        "label": "Create File Format",
        "type": "process"
       },
       {
        "id": "5314f543ec",
        "label": "Query Staging File Data",
        "type": "decision"
       },
       {
        "id": "ebca7fa6f7",
        "label": "Copy to 'game_logs' Table",
        "type": "io"
       },
       {
        "id": "642d833379",
        "label": "Verify Records & Count",
        "type": "decision"
       },
       {
        "id": "d55a93fc53",
        "label": "Parse the JSON Attributes",
        "type": "process"
       },
       {
        "id": "70f7ed2cb2",
        "label": "Create the LOGS View",
        "type": "process"
       },
       {
        "id": "b7a59ccd0c",
        "label": "Validate the view",
        "type": "decision"
       },
       {
        "id": "4a1bf79720",
        "label": "Run DORA",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Create the Project Infrastructure",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>Inspect Data » Databases and verify ownership.<br>Expected: AGS_GAME_AUDIENCE and RAW exist, PUBLIC is absent, and both are owned by SYSADMIN.</span></p>",
        "code": "USE ROLE SYSADMIN;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "26e5c35ac3",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>Inspect Data » Databases and verify ownership.<br>Expected: AGS_GAME_AUDIENCE and RAW exist, PUBLIC is absent, and both are owned by SYSADMIN.</span></p>"
         },
         {
          "type": "snippet",
          "id": "2c9dd74e1b",
          "lang": "sql",
          "code": "USE ROLE SYSADMIN;",
          "label": null
         },
         {
          "type": "snippet",
          "id": "c056c528fe",
          "lang": "sql",
          "code": "CREATE DATABASE AGS_GAME_AUDIENCE;\n DROP SCHEMA AGS_GAME_AUDIENCE.PUBLIC;\n CREATE SCHEMA AGS_GAME_AUDIENCE.RAW;\n USE DATABASE AGS_GAME_AUDIENCE;\n USE SCHEMA RAW;\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "Create the Raw JSON Table",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>Describe the table.<br>Expected: GAME_LOGS has exactly one VARIANT column named RAW_LOG.</span></p>",
        "code": "1. Open Data » Databases » AGS_GAME_AUDIENCE » RAW.\n2. Click Create » Table » Standard, THEN open the table code template.\n3. Set the table name to GAME_LOGS and create one column: RAW_LOG VARIANT.\n4. Create the table using SYSADMIN.\n",
        "codeLang": "text",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "2229c3ddb8",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>Describe the table.<br>Expected: GAME_LOGS has exactly one VARIANT column named RAW_LOG.</span></p>"
         },
         {
          "type": "snippet",
          "id": "54a0d5f620",
          "lang": "text",
          "code": "1. Open Data » Databases » AGS_GAME_AUDIENCE » RAW.\n2. Click Create » Table » Standard, THEN open the table code template.\n3. Set the table name to GAME_LOGS and create one column: RAW_LOG VARIANT.\n4. Create the table using SYSADMIN.\n",
          "label": null
         },
         {
          "type": "snippet",
          "id": "a86562fb58",
          "lang": "sql",
          "code": "CREATE OR REPLACE TABLE game_logs (\n \traw_log VARIANT\n );",
          "label": null
         }
        ]
       },
       {
        "title": "Create the External Stage using Snowsight interface",
        "description": "<ol><li><p><span>Open AGS_GAME_AUDIENCE » RAW and click Create » Stage » Amazon S3.</span></p></li><li><p><span>Stage name: UNI_KISHORE.</span></p></li><li><p><span>Schema: AGS_GAME_AUDIENCE.RAW.</span></p></li><li><p><span>URL: s3://uni-kishore.</span></p></li><li><p><span>Leave authentication disabled and create the stage.</span></p></li></ol>",
        "code": "CREATE OR REPLACE STAGE uni_kishore\n URL = 's3://uni-kishore';\n\n LIST @uni_kishore;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "903946d382",
          "html": "<ol><li><p><span>Open AGS_GAME_AUDIENCE » RAW and click Create » Stage » Amazon S3.</span></p></li><li><p><span>Stage name: UNI_KISHORE.</span></p></li><li><p><span>Schema: AGS_GAME_AUDIENCE.RAW.</span></p></li><li><p><span>URL: s3://uni-kishore.</span></p></li><li><p><span>Leave authentication disabled and create the stage.</span></p></li></ol>"
         },
         {
          "type": "snippet",
          "id": "45e7811bf1",
          "lang": "sql",
          "code": "CREATE OR REPLACE STAGE uni_kishore\n URL = 's3://uni-kishore';\n\n LIST @uni_kishore;",
          "label": null
         }
        ]
       },
       {
        "title": "Create and Test the JSON File Format",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>Describe the format and confirm its settings.<br>Expected: TYPE = JSON and STRIP_OUTER_ARRAY = true.</span></p>",
        "code": "CREATE OR REPLACE FILE FORMAT ff_json_logs\n TYPE = JSON\n STRIP_OUTER_ARRAY = TRUE;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "d3eef4b3be",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>Describe the format and confirm its settings.<br>Expected: TYPE = JSON and STRIP_OUTER_ARRAY = true.</span></p>"
         },
         {
          "type": "snippet",
          "id": "31653749f2",
          "lang": "sql",
          "code": "CREATE OR REPLACE FILE FORMAT ff_json_logs\n TYPE = JSON\n STRIP_OUTER_ARRAY = TRUE;",
          "label": null
         },
         {
          "type": "snippet",
          "id": "188f3ad149",
          "lang": "sql",
          "code": "SELECT $1\n FROM @uni_kishore/kickoff\n (FILE_FORMAT => ff_json_logs);",
          "label": null
         }
        ]
       },
       {
        "title": "Load the Kickoff File",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>Review COPY results.<br>Expected: The DNGW sample JSON file has status LOADED.</span></p>",
        "code": "COPY INTO ags_game_audience.raw.game_logs\n FROM @uni_kishore/kickoff\n FILE_FORMAT = (FORMAT_NAME = ff_json_logs);",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "c8140fffeb",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>Review COPY results.<br>Expected: The DNGW sample JSON file has status LOADED.</span></p>"
         },
         {
          "type": "snippet",
          "id": "7409f2ebd0",
          "lang": "sql",
          "code": "COPY INTO ags_game_audience.raw.game_logs\n FROM @uni_kishore/kickoff\n FILE_FORMAT = (FORMAT_NAME = ff_json_logs);",
          "label": null
         },
         {
          "type": "snippet",
          "id": "9644f35f1a",
          "lang": "sql",
          "code": "SELECT COUNT(*) AS raw_row_count\n FROM game_logs;\n\n SELECT raw_log\n FROM game_logs;",
          "label": null
         }
        ]
       },
       {
        "title": "Parse the JSON Attributes",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>Verify the result layout and types.<br>Expected: Five columns and 250 rows. DATETIME_ISO8601 displays as a timestamp; RAW_LOG remains the final column.</span></p>",
        "code": "SELECT\n \traw_log:agent::TEXT AS agent,\n \traw_log:user_event::TEXT AS user_event,\n \traw_log:user_login::TEXT AS user_login,\n     raw_log:datetime_iso8601::TIMESTAMP_NTZ AS datetime_iso8601,\n \traw_log\n FROM game_logs;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "8d7213c373",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>Verify the result layout and types.<br>Expected: Five columns and 250 rows. DATETIME_ISO8601 displays as a timestamp; RAW_LOG remains the final column.</span></p>"
         },
         {
          "type": "snippet",
          "id": "bc6df1fb39",
          "lang": "sql",
          "code": "SELECT\n \traw_log:agent::TEXT AS agent,\n \traw_log:user_event::TEXT AS user_event,\n \traw_log:user_login::TEXT AS user_login,\n     raw_log:datetime_iso8601::TIMESTAMP_NTZ AS datetime_iso8601,\n \traw_log\n FROM game_logs;",
          "label": null
         }
        ]
       },
       {
        "title": "Create the LOGS View",
        "description": null,
        "code": "CREATE OR REPLACE VIEW logs AS\n SELECT\n \traw_log:agent::TEXT AS agent,\n \traw_log:user_event::TEXT AS user_event,\n \traw_log:user_login::TEXT AS user_login,\n     raw_log:datetime_iso8601::TIMESTAMP_NTZ AS datetime_iso8601,\n \traw_log\n FROM game_logs;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "91ba40b3cf",
          "lang": "sql",
          "code": "CREATE OR REPLACE VIEW logs AS\n SELECT\n \traw_log:agent::TEXT AS agent,\n \traw_log:user_event::TEXT AS user_event,\n \traw_log:user_login::TEXT AS user_login,\n     raw_log:datetime_iso8601::TIMESTAMP_NTZ AS datetime_iso8601,\n \traw_log\n FROM game_logs;",
          "label": null
         }
        ]
       },
       {
        "title": "Validate the view",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>Confirm the final view is ready for grading.<br>Expected: LOG_COUNT = 250 and VALID_TIMESTAMP_COUNT = 250.</span></p>",
        "code": "SELECT *\n FROM logs;\n\n SELECT COUNT(*) AS log_count,\n        COUNT_IF(IS_TIMESTAMP_NTZ(TO_VARIANT(datetime_iso8601)))\n        \tAS valid_timestamp_count\n FROM logs;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "5745a762bd",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>Confirm the final view is ready for grading.<br>Expected: LOG_COUNT = 250 and VALID_TIMESTAMP_COUNT = 250.</span></p>"
         },
         {
          "type": "snippet",
          "id": "72171dcf17",
          "lang": "sql",
          "code": "SELECT *\n FROM logs;\n\n SELECT COUNT(*) AS log_count,\n        COUNT_IF(IS_TIMESTAMP_NTZ(TO_VARIANT(datetime_iso8601)))\n        \tAS valid_timestamp_count\n FROM logs;",
          "label": null
         }
        ]
       }
      ]
     },
     {
      "title": "Evolving JSON Feed & Filtered View",
      "overview": null,
      "explanation": "<p><span><strong>Time Zones  •  Schema-on-Read  •  Updated Feed  •  View Replacement</strong></span></p><p><span><strong>GOAL  </strong></span><span>Load the revised 284-row feed without removing the original 250 rows, update LOGS for IP_ADDRESS, and pass DNGW02.</span></p>",
      "output": "<p><em>Run the DORA Check</em></p>",
      "outputCode": "SELECT GRADER(step, (actual = expected), actual, expected, description)\n    \tAS graded_results\n FROM (\n \tSELECT\n     \t'DNGW02' AS step,\n     \t(\n         \tSELECT SUM(tally)\n         \tFROM (\n             \tSELECT COUNT(*) * -1 AS tally\n             \tFROM ags_game_audience.raw.logs\n             \tUNION ALL\n             \tSELECT COUNT(*) AS tally\n             \tFROM ags_game_audience.raw.game_logs\n         \t)\n     \t) AS actual,\n     \t250 AS expected,\n     \t'View is filtered' AS description\n );\n",
      "flow": [
       {
        "id": "6512c91e6e",
        "label": "Goto Work Sheet",
        "type": "start"
       },
       {
        "id": "b539269f87",
        "label": "Verify game_logs & logs table records",
        "type": "decision"
       },
       {
        "id": "d19701b967",
        "label": "Verify 'game_logs' Table Structure",
        "type": "decision"
       },
       {
        "id": "4ff56b9c52",
        "label": "Explore Session Time Zones",
        "type": "process"
       },
       {
        "id": "48e63d1221",
        "label": "Verify External Staging",
        "type": "decision"
       },
       {
        "id": "35efe1d47e",
        "label": "Verify 'updated_feed' Data",
        "type": "decision"
       },
       {
        "id": "75c414fb9c",
        "label": "Copy Stage data to 'game_logs' Table",
        "type": "io"
       },
       {
        "id": "b02d3b9c31",
        "label": "Compare the Two JSON Schemas",
        "type": "process"
       },
       {
        "id": "69e23abec2",
        "label": "Replace the LOGS View",
        "type": "process"
       },
       {
        "id": "621cf0ed7f",
        "label": "Validate the filtered view",
        "type": "decision"
       },
       {
        "id": "c66fd7677e",
        "label": "Investigate Prajina’s Test Events",
        "type": "decision"
       },
       {
        "id": "1e788a8846",
        "label": "Run DORA",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Confirm the DNGW01 Starting Point",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>Do not continue until lesson 1 is correct.<br>Expected: GAME_LOGS_ROWS = 250; LOGS_VIEW_ROWS = 250; GAME_LOGS has one VARIANT column named RAW_LOG.</span></p>",
        "code": "USE ROLE SYSADMIN;\n USE DATABASE AGS_GAME_AUDIENCE;\n USE SCHEMA RAW;\n\n SELECT COUNT(*) AS game_logs_rows FROM game_logs;\n SELECT COUNT(*) AS logs_view_rows FROM logs;\n DESCRIBE TABLE game_logs;\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "71d02c25df",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>Do not continue until lesson 1 is correct.<br>Expected: GAME_LOGS_ROWS = 250; LOGS_VIEW_ROWS = 250; GAME_LOGS has one VARIANT column named RAW_LOG.</span></p>"
         },
         {
          "type": "snippet",
          "id": "c32a361741",
          "lang": "sql",
          "code": "USE ROLE SYSADMIN;\n USE DATABASE AGS_GAME_AUDIENCE;\n USE SCHEMA RAW;\n\n SELECT COUNT(*) AS game_logs_rows FROM game_logs;\n SELECT COUNT(*) AS logs_view_rows FROM logs;\n DESCRIBE TABLE game_logs;\n",
          "label": null
         }
        ]
       },
       {
        "title": "Explore Session Time Zones",
        "description": "<p><span><strong>SESSION SCOPE  </strong></span><span>ALTER SESSION changes only the current worksheet/session. It does not rewrite stored TIMESTAMP_NTZ values.</span></p>",
        "code": "SELECT CURRENT_TIMESTAMP();\n\n ALTER SESSION SET TIMEZONE = 'UTC';\n SELECT CURRENT_TIMESTAMP();\n\n ALTER SESSION SET TIMEZONE = 'Africa/Nairobi';\n SELECT CURRENT_TIMESTAMP();\n\n ALTER SESSION SET TIMEZONE = 'Pacific/Funafuti';\n SELECT CURRENT_TIMESTAMP();\n\n ALTER SESSION SET TIMEZONE = 'Asia/Shanghai';\n SELECT CURRENT_TIMESTAMP();\n\n SHOW PARAMETERS LIKE 'TIMEZONE';\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "2a3fdd348c",
          "html": "<p><span><strong>SESSION SCOPE  </strong></span><span>ALTER SESSION changes only the current worksheet/session. It does not rewrite stored TIMESTAMP_NTZ values.</span></p>"
         },
         {
          "type": "snippet",
          "id": "d0aa48a4c5",
          "lang": "sql",
          "code": "SELECT CURRENT_TIMESTAMP();\n\n ALTER SESSION SET TIMEZONE = 'UTC';\n SELECT CURRENT_TIMESTAMP();\n\n ALTER SESSION SET TIMEZONE = 'Africa/Nairobi';\n SELECT CURRENT_TIMESTAMP();\n\n ALTER SESSION SET TIMEZONE = 'Pacific/Funafuti';\n SELECT CURRENT_TIMESTAMP();\n\n ALTER SESSION SET TIMEZONE = 'Asia/Shanghai';\n SELECT CURRENT_TIMESTAMP();\n\n SHOW PARAMETERS LIKE 'TIMEZONE';\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "Find and Preview the Updated Feed",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>Confirm both course folders are present.<br>Expected: KICKOFF contains the old file; UPDATED_FEED contains the new file.</span></p>",
        "code": "LIST @uni_kishore;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "1d0f8524fc",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>Confirm both course folders are present.<br>Expected: KICKOFF contains the old file; UPDATED_FEED contains the new file.</span></p>"
         },
         {
          "type": "snippet",
          "id": "85d0820fcc",
          "lang": "sql",
          "code": "LIST @uni_kishore;",
          "label": null
         }
        ]
       },
       {
        "title": "Preview the new JSON before loading",
        "description": "<p>CHECKPOINT Inspect several objects. Expected: New rows contain ip_address, user_event, user_login, and datetime_iso8601; agent is absent.</p><p>NO TABLE CHANGE GAME_LOGS contains one VARIANT column, so the new JSON structure fits without ALTER TABLE. This is schema-on-read.</p>",
        "code": "SELECT $1\n FROM @uni_kishore/updated_feed\n (FILE_FORMAT => ff_json_logs);\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "28789f77a6",
          "html": "<p>CHECKPOINT Inspect several objects. Expected: New rows contain ip_address, user_event, user_login, and datetime_iso8601; agent is absent.</p><p>NO TABLE CHANGE GAME_LOGS contains one VARIANT column, so the new JSON structure fits without ALTER TABLE. This is schema-on-read.</p>"
         },
         {
          "type": "snippet",
          "id": "1394e4439c",
          "lang": "sql",
          "code": "SELECT $1\n FROM @uni_kishore/updated_feed\n (FILE_FORMAT => ff_json_logs);\n",
          "label": null
         },
         {
          "type": "snippet",
          "id": "b48f3aebbe",
          "lang": "sql",
          "code": "COPY INTO ags_game_audience.raw.game_logs\n FROM @uni_kishore/updated_feed\n FILE_FORMAT = (FORMAT_NAME = ff_json_logs);\n\nSELECT COUNT(*) AS total_raw_rows\n FROM game_logs;",
          "label": null
         },
         {
          "type": "snippet",
          "id": "0eeee2f9bf",
          "lang": "sql",
          "code": "SELECT\n \traw_log,\n \traw_log:agent::TEXT AS agent,\n \traw_log:ip_address::TEXT AS ip_address,\n \traw_log:user_event::TEXT AS user_event,\n \traw_log:user_login::TEXT AS user_login\n FROM game_logs;",
          "label": null
         },
         {
          "type": "snippet",
          "id": "41bb60ec1a",
          "lang": "sql",
          "code": "CREATE OR REPLACE VIEW logs AS\n SELECT\n \traw_log:ip_address::TEXT AS ip_address,\n \traw_log:user_event::TEXT AS user_event,\n \traw_log:user_login::TEXT AS user_login,\n     raw_log:datetime_iso8601::TIMESTAMP_NTZ AS datetime_iso8601,\n \traw_log\n FROM game_logs\n WHERE raw_log:ip_address::TEXT IS NOT NULL;\n",
          "label": null
         }
        ]
       },
       {
        "title": "Validate the filtered view",
        "description": "<p>CHECKPOINT The view contains only the new schema. Expected: FILTERED_LOG_ROWS = 284; ROWS_WITH_IP = 284; VALID_TIMESTAMPS = 284; AGENT is not a view column.</p>",
        "code": "SELECT * FROM logs;\n\n SELECT COUNT(*) AS filtered_log_rows,\n    \tCOUNT_IF(ip_address IS NOT NULL) AS rows_with_ip,\n        COUNT_IF(IS_TIMESTAMP_NTZ(TO_VARIANT(datetime_iso8601)))\n        \tAS valid_timestamps\n FROM logs;\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "46b1ff5c49",
          "html": "<p>CHECKPOINT The view contains only the new schema. Expected: FILTERED_LOG_ROWS = 284; ROWS_WITH_IP = 284; VALID_TIMESTAMPS = 284; AGENT is not a view column.</p>"
         },
         {
          "type": "snippet",
          "id": "5726cab987",
          "lang": "sql",
          "code": "SELECT * FROM logs;\n\n SELECT COUNT(*) AS filtered_log_rows,\n    \tCOUNT_IF(ip_address IS NOT NULL) AS rows_with_ip,\n        COUNT_IF(IS_TIMESTAMP_NTZ(TO_VARIANT(datetime_iso8601)))\n        \tAS valid_timestamps\n FROM logs;\n",
          "label": null
         },
         {
          "type": "snippet",
          "id": "ea3186b883",
          "lang": "sql",
          "code": "SELECT\n \tuser_login,\n \tuser_event,\n \tdatetime_iso8601,\n \tip_address\n FROM logs\n WHERE user_login ILIKE '%prajina%'\n ORDER BY datetime_iso8601;",
          "label": null
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "title": "IP Geolocation & Local-Time Enhancement",
    "order": 1,
    "linkUrl": null,
    "modules": [
     {
      "title": "IP Geolocation & Local-Time Enhancement - Lab",
      "overview": null,
      "explanation": null,
      "output": "<p><span><strong><mark data-color=\"#ff0000\">NEVER EDIT DORA CODE TO GET A GREEN CHECK. EDIT YOUR LAB WORK.</mark></strong></span></p>",
      "outputCode": "select GRADER(step, (actual = expected), actual, expected, description) as graded_results from\n(\n  SELECT\n   'DNGW03' as step\n   ,( select count(*) \n      from ags_game_audience.enhanced.logs_enhanced\n      where dow_name = 'Sat'\n      and tod_name = 'Early evening'   \n      and gamer_name like '%prajina'\n     ) as actual\n   ,2 as expected\n   ,'Playing the game on a Saturday evening' as description\n); ",
      "flow": [
       {
        "id": "ffa6515763",
        "label": "Goto 'Lab' Work Sheet",
        "type": "start"
       },
       {
        "id": "5613a56db9",
        "label": "Verify 'Logs' View",
        "type": "decision"
       },
       {
        "id": "92a3e6e2b1",
        "label": "Create 'ENHANCED' Schema",
        "type": "process"
       },
       {
        "id": "eb9b8c1c3e",
        "label": "Query User Data from 'logs' View",
        "type": "io"
       },
       {
        "id": "8bb49636a2",
        "label": "Test PARSE_IP",
        "type": "process"
       },
       {
        "id": "3b88a43cb5",
        "label": "Goto Marketplace",
        "type": "process"
       },
       {
        "id": "bca7677843",
        "label": "Add 'IPInfo IP Geolocation' Service",
        "type": "process"
       },
       {
        "id": "2f8c395e08",
        "label": "Set 'IPINFO_GEOLOC' to IPINFO Service",
        "type": "process"
       },
       {
        "id": "1b4888f3cb",
        "label": "Test IP-to-Location Joins",
        "type": "decision"
       },
       {
        "id": "d5420f0572",
        "label": "Basic join for all log rows",
        "type": "process"
       },
       {
        "id": "08e0d497d4",
        "label": "Efficient IPInfo-function join",
        "type": "process"
       },
       {
        "id": "f2bdc652ec",
        "label": "Add Local Time and Day Name",
        "type": "process"
       },
       {
        "id": "bf4029b6b4",
        "label": "Add the local weekday",
        "type": "process"
       },
       {
        "id": "cf632a76e5",
        "label": "Create the Time-of-Day Lookup",
        "type": "io"
       },
       {
        "id": "a64f765a2f",
        "label": "Build the Complete Enhanced SELECT",
        "type": "process"
       },
       {
        "id": "850bf0e777",
        "label": "Create LOGS_ENHANCED",
        "type": "io"
       },
       {
        "id": "f068e3b7ea",
        "label": "Run DORA",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Confirm the DNGW02 Starting Point",
        "description": "<p>CHECKPOINT Confirm lesson 2 is complete. Expected: FILTERED_ROWS = 284; LOGS includes IP_ADDRESS and does not include AGENT.</p>",
        "code": "USE ROLE SYSADMIN;\n USE DATABASE AGS_GAME_AUDIENCE;\n USE SCHEMA RAW;\n\n SELECT COUNT(*) AS filtered_rows FROM logs;\n DESCRIBE VIEW logs;\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "079d704409",
          "html": "<p>CHECKPOINT Confirm lesson 2 is complete. Expected: FILTERED_ROWS = 284; LOGS includes IP_ADDRESS and does not include AGENT.</p>"
         },
         {
          "type": "snippet",
          "id": "3d0e928dc0",
          "lang": "sql",
          "code": "USE ROLE SYSADMIN;\n USE DATABASE AGS_GAME_AUDIENCE;\n USE SCHEMA RAW;\n\n SELECT COUNT(*) AS filtered_rows FROM logs;\n DESCRIBE VIEW logs;\n",
          "label": null
         }
        ]
       },
       {
        "title": "Create the enhanced layer",
        "description": null,
        "code": "CREATE SCHEMA IF NOT EXISTS AGS_GAME_AUDIENCE.ENHANCED;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "cd98697ef0",
          "lang": "sql",
          "code": "CREATE SCHEMA IF NOT EXISTS AGS_GAME_AUDIENCE.ENHANCED;",
          "label": null
         }
        ]
       },
       {
        "title": "Find and Parse Prajina’s IP Address",
        "description": "<p>CHECKPOINT Copy the headset IP address from Prajina’s login/logout rows. Expected: The course example later uses 100.41.16.160.</p>",
        "code": "SELECT user_login, user_event, datetime_iso8601, ip_address\n FROM ags_game_audience.raw.logs\n WHERE user_login ILIKE '%praj%'\n ORDER BY datetime_iso8601;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "38e48469df",
          "html": "<p>CHECKPOINT Copy the headset IP address from Prajina’s login/logout rows. Expected: The course example later uses 100.41.16.160.</p>"
         },
         {
          "type": "snippet",
          "id": "a9b7841f7c",
          "lang": "sql",
          "code": "SELECT user_login, user_event, datetime_iso8601, ip_address\n FROM ags_game_audience.raw.logs\n WHERE user_login ILIKE '%praj%'\n ORDER BY datetime_iso8601;",
          "label": null
         }
        ]
       },
       {
        "title": "Test PARSE_IP",
        "description": null,
        "code": "SELECT PARSE_IP('100.41.16.160', 'inet') AS parsed_ip,\n    \tPARSE_IP('100.41.16.160', 'inet'):host AS host,\n    \tPARSE_IP('100.41.16.160', 'inet'):family AS family,\n    \tPARSE_IP('100.41.16.160', 'inet'):ipv4 AS ipv4_integer;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "319dccb320",
          "lang": "sql",
          "code": "SELECT PARSE_IP('100.41.16.160', 'inet') AS parsed_ip,\n    \tPARSE_IP('100.41.16.160', 'inet'):host AS host,\n    \tPARSE_IP('100.41.16.160', 'inet'):family AS family,\n    \tPARSE_IP('100.41.16.160', 'inet'):ipv4 AS ipv4_integer;",
          "label": null
         }
        ]
       },
       {
        "title": "Add the IPInfo Marketplace Listing",
        "description": "<p>1. Change your role to ACCOUNTADMIN.</p><p>2. Open Marketplace and search for IPInfo IP Geolocation Training/Education Sample .</p><p>3. Open the IPInfo listing and click Get or Get for Free.</p><p>4. Set the database name to IPINFO_GEOLOC and owner as SYSADMIN .</p><p>5. Go to database explorer and open IPINFO_GEOLOC Database</p><p>6. Grant access to both SYSADMIN and Account Admin by selecting privilege button</p><p>7. in workspace , run the query to verify data is loaded from , IP Geolocation Training/Education Sample service,</p><p>SELECT * FROM IPINFO_GEOLOC.DEMO.LOCATION LIMIT 100;</p><p>9. When ready, select Query Data, then switch back to SYSADMIN.</p>",
        "code": "SELECT * FROM IPINFO_GEOLOC.DEMO.LOCATION LIMIT 100;",
        "codeLang": "text",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "ef48c6a3fd",
          "html": "<p>1. Change your role to ACCOUNTADMIN.</p><p>2. Open Marketplace and search for IPInfo IP Geolocation Training/Education Sample .</p><p>3. Open the IPInfo listing and click Get or Get for Free.</p><p>4. Set the database name to IPINFO_GEOLOC and owner as SYSADMIN .</p><p>5. Go to database explorer and open IPINFO_GEOLOC Database</p><p>6. Grant access to both SYSADMIN and Account Admin by selecting privilege button</p><p>7. in workspace , run the query to verify data is loaded from , IP Geolocation Training/Education Sample service,</p><p>SELECT * FROM IPINFO_GEOLOC.DEMO.LOCATION LIMIT 100;</p><p>9. When ready, select Query Data, then switch back to SYSADMIN.</p>"
         },
         {
          "type": "snippet",
          "id": "c27d907430",
          "lang": "text",
          "code": "SELECT * FROM IPINFO_GEOLOC.DEMO.LOCATION LIMIT 100;",
          "label": null
         }
        ]
       },
       {
        "title": "Test IP-to-Location Joins",
        "description": null,
        "code": "SELECT start_ip, end_ip, start_ip_int, end_ip_int,\n    \tcity, region, country, timezone\n FROM IPINFO_GEOLOC.DEMO.LOCATION\n WHERE PARSE_IP('100.41.16.160', 'inet'):ipv4\n   \tBETWEEN start_ip_int AND end_ip_int;\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "08ee5438e8",
          "lang": "sql",
          "code": "SELECT start_ip, end_ip, start_ip_int, end_ip_int,\n    \tcity, region, country, timezone\n FROM IPINFO_GEOLOC.DEMO.LOCATION\n WHERE PARSE_IP('100.41.16.160', 'inet'):ipv4\n   \tBETWEEN start_ip_int AND end_ip_int;\n",
          "label": null
         }
        ]
       },
       {
        "title": "Basic join for all log rows",
        "description": null,
        "code": "SELECT logs.*, loc.city, loc.region, loc.country, loc.timezone\n FROM AGS_GAME_AUDIENCE.RAW.LOGS logs\n JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   ON PARSE_IP(logs.ip_address, 'inet'):ipv4\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int;\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "e64bdfee95",
          "lang": "sql",
          "code": "SELECT logs.*, loc.city, loc.region, loc.country, loc.timezone\n FROM AGS_GAME_AUDIENCE.RAW.LOGS logs\n JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   ON PARSE_IP(logs.ip_address, 'inet'):ipv4\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int;\n",
          "label": null
         }
        ]
       },
       {
        "title": "Efficient IPInfo-function join",
        "description": null,
        "code": "SELECT logs.ip_address, logs.user_login, logs.user_event,\n    \tlogs.datetime_iso8601, loc.city, loc.region,\n    \tloc.country, loc.timezone\n FROM AGS_GAME_AUDIENCE.RAW.LOGS logs\n JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address) = loc.join_key\n AND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "8539e7af80",
          "lang": "sql",
          "code": "SELECT logs.ip_address, logs.user_login, logs.user_event,\n    \tlogs.datetime_iso8601, loc.city, loc.region,\n    \tloc.country, loc.timezone\n FROM AGS_GAME_AUDIENCE.RAW.LOGS logs\n JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address) = loc.join_key\n AND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int;",
          "label": null
         }
        ]
       },
       {
        "title": "Add Local Time and Day Name",
        "description": "<p>Convert UTC to each gamer’s local time</p>",
        "code": "SELECT logs.ip_address, logs.user_login, logs.user_event,\n    \tlogs.datetime_iso8601, loc.city, loc.region,\n    \tloc.country, loc.timezone,\n    \tCONVERT_TIMEZONE('UTC', loc.timezone, logs.datetime_iso8601)\n        \tAS game_event_ltz\n FROM AGS_GAME_AUDIENCE.RAW.LOGS logs\n JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address) = loc.join_key\n  AND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "24ac9c1ce4",
          "html": "<p>Convert UTC to each gamer’s local time</p>"
         },
         {
          "type": "snippet",
          "id": "9327b2f2bd",
          "lang": "sql",
          "code": "SELECT logs.ip_address, logs.user_login, logs.user_event,\n    \tlogs.datetime_iso8601, loc.city, loc.region,\n    \tloc.country, loc.timezone,\n    \tCONVERT_TIMEZONE('UTC', loc.timezone, logs.datetime_iso8601)\n        \tAS game_event_ltz\n FROM AGS_GAME_AUDIENCE.RAW.LOGS logs\n JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address) = loc.join_key\n  AND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int;",
          "label": null
         }
        ]
       },
       {
        "title": "Add the local weekday",
        "description": null,
        "code": "SELECT logs.ip_address, logs.user_login, logs.user_event,\n    \tlogs.datetime_iso8601, loc.city, loc.region,\n    \tloc.country, loc.timezone,\n    \tCONVERT_TIMEZONE('UTC', loc.timezone, logs.datetime_iso8601)\n        \tAS game_event_ltz,\n    \tDAYNAME(game_event_ltz) AS dow_name\n FROM AGS_GAME_AUDIENCE.RAW.LOGS logs\n JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address) = loc.join_key\n  AND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int;\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "20a60ac441",
          "lang": "sql",
          "code": "SELECT logs.ip_address, logs.user_login, logs.user_event,\n    \tlogs.datetime_iso8601, loc.city, loc.region,\n    \tloc.country, loc.timezone,\n    \tCONVERT_TIMEZONE('UTC', loc.timezone, logs.datetime_iso8601)\n        \tAS game_event_ltz,\n    \tDAYNAME(game_event_ltz) AS dow_name\n FROM AGS_GAME_AUDIENCE.RAW.LOGS logs\n JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address) = loc.join_key\n  AND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int;\n",
          "label": null
         }
        ]
       },
       {
        "title": "Create the Time-of-Day Lookup",
        "description": null,
        "code": "USE ROLE SYSADMIN;\n USE DATABASE AGS_GAME_AUDIENCE;\n USE SCHEMA RAW;\n\n CREATE OR REPLACE TABLE time_of_day_lu (\n \thour NUMBER,\n \ttod_name VARCHAR(25)\n );\n\n INSERT INTO time_of_day_lu VALUES\n (6,'Early morning'), (7,'Early morning'), (8,'Early morning'),\n (9,'Mid-morning'), (10,'Mid-morning'),\n (11,'Late morning'), (12,'Late morning'),\n (13,'Early afternoon'), (14,'Early afternoon'),\n (15,'Mid-afternoon'), (16,'Mid-afternoon'),\n (17,'Late afternoon'), (18,'Late afternoon'),\n (19,'Early evening'), (20,'Early evening'),\n (21,'Late evening'), (22,'Late evening'), (23,'Late evening'),\n (0,'Late at night'), (1,'Late at night'), (2,'Late at night'),\n (3,'Toward morning'), (4,'Toward morning'), (5,'Toward morning');\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "8c97a813ed",
          "lang": "sql",
          "code": "USE ROLE SYSADMIN;\n USE DATABASE AGS_GAME_AUDIENCE;\n USE SCHEMA RAW;\n\n CREATE OR REPLACE TABLE time_of_day_lu (\n \thour NUMBER,\n \ttod_name VARCHAR(25)\n );\n\n INSERT INTO time_of_day_lu VALUES\n (6,'Early morning'), (7,'Early morning'), (8,'Early morning'),\n (9,'Mid-morning'), (10,'Mid-morning'),\n (11,'Late morning'), (12,'Late morning'),\n (13,'Early afternoon'), (14,'Early afternoon'),\n (15,'Mid-afternoon'), (16,'Mid-afternoon'),\n (17,'Late afternoon'), (18,'Late afternoon'),\n (19,'Early evening'), (20,'Early evening'),\n (21,'Late evening'), (22,'Late evening'), (23,'Late evening'),\n (0,'Late at night'), (1,'Late at night'), (2,'Late at night'),\n (3,'Toward morning'), (4,'Toward morning'), (5,'Toward morning');\n",
          "label": null
         }
        ]
       },
       {
        "title": "Build the Complete Enhanced SELECT",
        "description": null,
        "code": "SELECT\n \tlogs.ip_address,\n \tlogs.user_login AS gamer_name,\n \tlogs.user_event AS game_event_name,\n \tlogs.datetime_iso8601 AS game_event_utc,\n \tloc.city,\n \tloc.region,\n \tloc.country,\n \tloc.timezone AS gamer_ltz_name,\n \tCONVERT_TIMEZONE('UTC', loc.timezone, logs.datetime_iso8601)\n     \tAS game_event_ltz,\n \tDAYNAME(game_event_ltz) AS dow_name,\n \tlu.tod_name\n FROM AGS_GAME_AUDIENCE.RAW.LOGS logs\n JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address) = loc.join_key\n  AND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n JOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU lu\n   ON HOUR(CONVERT_TIMEZONE('UTC', loc.timezone, logs.datetime_iso8601))\n  \t= lu.hour;\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "54d6901446",
          "lang": "sql",
          "code": "SELECT\n \tlogs.ip_address,\n \tlogs.user_login AS gamer_name,\n \tlogs.user_event AS game_event_name,\n \tlogs.datetime_iso8601 AS game_event_utc,\n \tloc.city,\n \tloc.region,\n \tloc.country,\n \tloc.timezone AS gamer_ltz_name,\n \tCONVERT_TIMEZONE('UTC', loc.timezone, logs.datetime_iso8601)\n     \tAS game_event_ltz,\n \tDAYNAME(game_event_ltz) AS dow_name,\n \tlu.tod_name\n FROM AGS_GAME_AUDIENCE.RAW.LOGS logs\n JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address) = loc.join_key\n  AND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n JOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU lu\n   ON HOUR(CONVERT_TIMEZONE('UTC', loc.timezone, logs.datetime_iso8601))\n  \t= lu.hour;\n",
          "label": null
         }
        ]
       },
       {
        "title": "Create LOGS_ENHANCED with CTAS",
        "description": null,
        "code": "CREATE OR REPLACE TABLE AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED AS\n SELECT\n \tlogs.ip_address,\n \tlogs.user_login AS gamer_name,\n \tlogs.user_event AS game_event_name,\n \tlogs.datetime_iso8601 AS game_event_utc,\n \tloc.city,\n \tloc.region,\n \tloc.country,\n \tloc.timezone AS gamer_ltz_name,\n \tCONVERT_TIMEZONE('UTC', loc.timezone, logs.datetime_iso8601)\n     \tAS game_event_ltz,\n \tDAYNAME(game_event_ltz) AS dow_name,\n \tlu.tod_name\n FROM AGS_GAME_AUDIENCE.RAW.LOGS logs\n JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address) = loc.join_key\n  AND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n JOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU lu\n   ON HOUR(CONVERT_TIMEZONE('UTC', loc.timezone, logs.datetime_iso8601))\n  \t= lu.hour;\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "72be9eb84f",
          "lang": "sql",
          "code": "CREATE OR REPLACE TABLE AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED AS\n SELECT\n \tlogs.ip_address,\n \tlogs.user_login AS gamer_name,\n \tlogs.user_event AS game_event_name,\n \tlogs.datetime_iso8601 AS game_event_utc,\n \tloc.city,\n \tloc.region,\n \tloc.country,\n \tloc.timezone AS gamer_ltz_name,\n \tCONVERT_TIMEZONE('UTC', loc.timezone, logs.datetime_iso8601)\n     \tAS game_event_ltz,\n \tDAYNAME(game_event_ltz) AS dow_name,\n \tlu.tod_name\n FROM AGS_GAME_AUDIENCE.RAW.LOGS logs\n JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address) = loc.join_key\n  AND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n JOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU lu\n   ON HOUR(CONVERT_TIMEZONE('UTC', loc.timezone, logs.datetime_iso8601))\n  \t= lu.hour;\n",
          "label": null
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "title": "PIPELINE - ETL , ELT",
    "order": 2,
    "linkUrl": null,
    "modules": [
     {
      "title": "Idempotent MERGE Task",
      "overview": null,
      "explanation": "<p><span><strong>GOAL  </strong></span><span>Productionize the enhanced-log load with a scheduled MERGE task that inserts each event only once, then pass DNGW04.</span></p>",
      "output": "<p><span><strong>Run the DORA Check</strong></span></p><table><colgroup><col></colgroup><tbody><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"587\"><p><span><strong>CHECKPOINT  </strong></span><span>The GRADER result reports a pass for DNGW04.<br>Expected: The task exists and TASK_HISTORY contains at least one run.</span></p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"587\"><p><span><strong>DO NOT MODIFY  </strong></span><span>Keep the step, task name, history function, expected value, and description unchanged.</span></p></td></tr></tbody></table>",
      "outputCode": "SELECT GRADER(step, (actual = expected), actual, expected, description)\n    \tAS graded_results\n FROM (\n \tSELECT\n     \t'DNGW04' AS step,\n     \t(\n         \tSELECT COUNT(*) / IFF(COUNT(*) = 0, 1, COUNT(*))\n         \tFROM TABLE(AGS_GAME_AUDIENCE.INFORMATION_SCHEMA.TASK_HISTORY(\n             \tTASK_NAME => 'LOAD_LOGS_ENHANCED'\n         \t))\n     \t) AS actual,\n     \t1 AS expected,\n     \t'Task exists and has been run at least once' AS description\n );\n\n",
      "flow": [
       {
        "id": "130d18f746",
        "label": "Confirm the DNGW03 Starting Point",
        "type": "start"
       },
       {
        "id": "d341f90185",
        "label": "Understand Full Refresh and Create a Backup",
        "type": "start"
       },
       {
        "id": "2210ade92c",
        "label": "Test MERGE Matching Logic",
        "type": "process"
       },
       {
        "id": "d213426de4",
        "label": "Build and Test the Idempotent Insert MERGE",
        "type": "process"
       },
       {
        "id": "6d153c1001",
        "label": "Create a Simple Scheduled Task",
        "type": "process"
       },
       {
        "id": "5db5e8d0ff",
        "label": "Grant Task Execution and Fix Ownership",
        "type": "process"
       },
       {
        "id": "6e4c5a5403",
        "label": "Replace the Task with the Final MERGE",
        "type": "process"
       },
       {
        "id": "1e202ef6e4",
        "label": "Execute and Verify the Task",
        "type": "decision"
       },
       {
        "id": "dd71e4c9cc",
        "label": "Optional New-Row Test",
        "type": "decision"
       },
       {
        "id": "949c937844",
        "label": "DORA Check",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Confirm the DNGW03 Starting Point",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>The enhanced table must exist and contain legitimate IP values.<br>Expected: ENHANCED_ROWS is greater than 0; INVALID_IPS = 0.</span></p>",
        "code": "USE ROLE SYSADMIN;\n USE WAREHOUSE COMPUTE_WH;\n\n SELECT COUNT(*) AS enhanced_rows\n FROM AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED;\n\n SELECT COUNT(*) AS invalid_ips\n FROM AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED\n WHERE ip_address ILIKE 'Hey,%';",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "7bfd21251c",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>The enhanced table must exist and contain legitimate IP values.<br>Expected: ENHANCED_ROWS is greater than 0; INVALID_IPS = 0.</span></p>"
         },
         {
          "type": "snippet",
          "id": "b160e7ed6b",
          "lang": "sql",
          "code": "USE ROLE SYSADMIN;\n USE WAREHOUSE COMPUTE_WH;\n\n SELECT COUNT(*) AS enhanced_rows\n FROM AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED;\n\n SELECT COUNT(*) AS invalid_ips\n FROM AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED\n WHERE ip_address ILIKE 'Hey,%';",
          "label": null
         }
        ]
       },
       {
        "title": "Understand Full Refresh and Create a Backup",
        "description": null,
        "code": "-- Reference pattern. Do not run unless deliberately rebuilding.\n TRUNCATE TABLE AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED;\n\n INSERT INTO AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED\n SELECT logs.ip_address,\n    \tlogs.user_login AS gamer_name,\n    \tlogs.user_event AS game_event_name,\n    \tlogs.datetime_iso8601 AS game_event_utc,\n    \tloc.city, loc.region, loc.country,\n    \tloc.timezone AS gamer_ltz_name,\n        CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601)\n        \tAS game_event_ltz,\n    \tDAYNAME(game_event_ltz) AS dow_name,\n    \ttod.tod_name\n FROM AGS_GAME_AUDIENCE.RAW.LOGS logs\n JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address)=loc.join_key\n  AND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n JOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU tod\n   ON HOUR(CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601))\n  \t= tod.hour;\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "ccecede7c7",
          "lang": "sql",
          "code": "-- Reference pattern. Do not run unless deliberately rebuilding.\n TRUNCATE TABLE AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED;\n\n INSERT INTO AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED\n SELECT logs.ip_address,\n    \tlogs.user_login AS gamer_name,\n    \tlogs.user_event AS game_event_name,\n    \tlogs.datetime_iso8601 AS game_event_utc,\n    \tloc.city, loc.region, loc.country,\n    \tloc.timezone AS gamer_ltz_name,\n        CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601)\n        \tAS game_event_ltz,\n    \tDAYNAME(game_event_ltz) AS dow_name,\n    \ttod.tod_name\n FROM AGS_GAME_AUDIENCE.RAW.LOGS logs\n JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address)=loc.join_key\n  AND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n JOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU tod\n   ON HOUR(CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601))\n  \t= tod.hour;\n\n",
          "label": null
         },
         {
          "type": "snippet",
          "id": "cff95ee9c1",
          "lang": "sql",
          "code": "CREATE OR REPLACE TABLE AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED_BU\n CLONE AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED;",
          "label": null
         }
        ]
       },
       {
        "title": "Test MERGE Matching Logic",
        "description": "<p><span><strong><mark data-color=\"#ff0000\">DESTRUCTIVE DEMO  </mark></strong><mark data-color=\"#ff0000\">The update below intentionally overwrites IP addresses. Run it only after creating LOGS_ENHANCED_BU, then immediately restore.</mark></span></p><p><span><strong>CHECKPOINT  </strong></span><span>The destructive test has been repaired.<br>Expected: INVALID_IPS = 0.</span></p>",
        "code": "MERGE INTO AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED e\n USING AGS_GAME_AUDIENCE.RAW.LOGS r\n ON  r.user_login = e.gamer_name\n AND r.datetime_iso8601 = e.game_event_utc\n AND r.user_event = e.game_event_name\n WHEN MATCHED THEN\n UPDATE SET ip_address = 'Hey, I updated matching rows!';\n\n",
        "codeLang": "sql",
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785081870831_Screenshot_2026-07-26_213217_1atwQRE7D.png",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "97080eb980",
          "html": "<p><span><strong><mark data-color=\"#ff0000\">DESTRUCTIVE DEMO  </mark></strong><mark data-color=\"#ff0000\">The update below intentionally overwrites IP addresses. Run it only after creating LOGS_ENHANCED_BU, then immediately restore.</mark></span></p><p><span><strong>CHECKPOINT  </strong></span><span>The destructive test has been repaired.<br>Expected: INVALID_IPS = 0.</span></p>"
         },
         {
          "type": "snippet",
          "id": "3ada1a1818",
          "lang": "sql",
          "code": "MERGE INTO AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED e\n USING AGS_GAME_AUDIENCE.RAW.LOGS r\n ON  r.user_login = e.gamer_name\n AND r.datetime_iso8601 = e.game_event_utc\n AND r.user_event = e.game_event_name\n WHEN MATCHED THEN\n UPDATE SET ip_address = 'Hey, I updated matching rows!';\n\n",
          "label": null
         },
         {
          "type": "snippet",
          "id": "c14e7f7b8a",
          "lang": "sql",
          "code": "CREATE OR REPLACE TABLE AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED\n CLONE AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED_BU;\n\n SELECT COUNT(*) AS invalid_ips\n FROM AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED\n WHERE ip_address ILIKE 'Hey,%';",
          "label": null
         },
         {
          "type": "image",
          "id": "d04a0ba350",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785081870831_Screenshot_2026-07-26_213217_1atwQRE7D.png",
          "caption": null
         }
        ]
       },
       {
        "title": "Build and Test the Idempotent Insert MERGE",
        "description": null,
        "code": "MERGE INTO AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED e\n USING (\n \tSELECT logs.ip_address,\n        \tlogs.user_login AS gamer_name,\n        \tlogs.user_event AS game_event_name,\n        \tlogs.datetime_iso8601 AS game_event_utc,\n        \tloc.city, loc.region, loc.country,\n        \tloc.timezone AS gamer_ltz_name,\n            CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601)\n            \tAS game_event_ltz,\n        \tDAYNAME(game_event_ltz) AS dow_name,\n        \ttod.tod_name\n \tFROM AGS_GAME_AUDIENCE.RAW.LOGS logs\n \tJOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   \tON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address)=loc.join_key\n  \tAND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n      \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n \tJOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU tod\n   \tON HOUR(CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601))\n      \t= tod.hour\n ) r\n ON  r.gamer_name = e.gamer_name\n AND r.game_event_utc = e.game_event_utc\n AND r.game_event_name = e.game_event_name\n WHEN NOT MATCHED THEN INSERT (\n \tip_address, gamer_name, game_event_name, game_event_utc,\n \tcity, region, country, gamer_ltz_name, game_event_ltz,\n \tdow_name, tod_name\n ) VALUES (\n \tr.ip_address, r.gamer_name, r.game_event_name, r.game_event_utc,\n \tr.city, r.region, r.country, r.gamer_ltz_name, r.game_event_ltz,\n \tr.dow_name, r.tod_name\n );\n\n",
        "codeLang": "sql",
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785082056101_Screenshot_2026-07-26_213658_c-SNgV-29.png",
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "08df3c8952",
          "lang": "sql",
          "code": "MERGE INTO AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED e\n USING (\n \tSELECT logs.ip_address,\n        \tlogs.user_login AS gamer_name,\n        \tlogs.user_event AS game_event_name,\n        \tlogs.datetime_iso8601 AS game_event_utc,\n        \tloc.city, loc.region, loc.country,\n        \tloc.timezone AS gamer_ltz_name,\n            CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601)\n            \tAS game_event_ltz,\n        \tDAYNAME(game_event_ltz) AS dow_name,\n        \ttod.tod_name\n \tFROM AGS_GAME_AUDIENCE.RAW.LOGS logs\n \tJOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   \tON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address)=loc.join_key\n  \tAND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n      \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n \tJOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU tod\n   \tON HOUR(CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601))\n      \t= tod.hour\n ) r\n ON  r.gamer_name = e.gamer_name\n AND r.game_event_utc = e.game_event_utc\n AND r.game_event_name = e.game_event_name\n WHEN NOT MATCHED THEN INSERT (\n \tip_address, gamer_name, game_event_name, game_event_utc,\n \tcity, region, country, gamer_ltz_name, game_event_ltz,\n \tdow_name, tod_name\n ) VALUES (\n \tr.ip_address, r.gamer_name, r.game_event_name, r.game_event_utc,\n \tr.city, r.region, r.country, r.gamer_ltz_name, r.game_event_ltz,\n \tr.dow_name, r.tod_name\n );\n\n",
          "label": null
         },
         {
          "type": "snippet",
          "id": "67da1e6daf",
          "lang": "sql",
          "code": "SELECT COUNT(*) AS before_count\n FROM AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED;",
          "label": null
         },
         {
          "type": "snippet",
          "id": "61ae28ae9b",
          "lang": "sql",
          "code": " SELECT COUNT(*) AS after_count\n FROM AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED;",
          "label": null
         },
         {
          "type": "image",
          "id": "6e58d78f3e",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785082056101_Screenshot_2026-07-26_213658_c-SNgV-29.png",
          "caption": null
         }
        ]
       },
       {
        "title": "Create a Simple Scheduled Task",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>Inspect the task. New tasks begin suspended.<br>Expected: RAW.LOAD_LOGS_ENHANCED exists, schedule is 5 minutes, state is suspended.</span></p>",
        "code": "USE ROLE SYSADMIN;\n\n CREATE OR REPLACE TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED\n WAREHOUSE = COMPUTE_WH\n SCHEDULE = '5 minute'\n AS\n SELECT 'hello';\n",
        "codeLang": "sql",
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785082188699_Screenshot_2026-07-26_213911_ER5jF6s5Q.png",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "371fb17e9f",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>Inspect the task. New tasks begin suspended.<br>Expected: RAW.LOAD_LOGS_ENHANCED exists, schedule is 5 minutes, state is suspended.</span></p>"
         },
         {
          "type": "snippet",
          "id": "db12484057",
          "lang": "sql",
          "code": "USE ROLE SYSADMIN;\n\n CREATE OR REPLACE TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED\n WAREHOUSE = COMPUTE_WH\n SCHEDULE = '5 minute'\n AS\n SELECT 'hello';\n",
          "label": null
         },
         {
          "type": "snippet",
          "id": "1a63d6c676",
          "lang": "sql",
          "code": "SHOW TASKS LIKE 'LOAD_LOGS_ENHANCED'\n IN SCHEMA AGS_GAME_AUDIENCE.RAW;\n\n DESCRIBE TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED;",
          "label": null
         },
         {
          "type": "image",
          "id": "8be3fe89d5",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785082188699_Screenshot_2026-07-26_213911_ER5jF6s5Q.png",
          "caption": null
         }
        ]
       },
       {
        "title": "Grant Task Execution and Fix Ownership",
        "description": "<p><span><strong>OWNERSHIP  </strong></span><span>The task owner needs privileges on every referenced object. The course commonly fails when RAW.LOGS was accidentally created under ACCOUNTADMIN.</span></p><p><span><strong>CHECKPOINT  </strong></span><span>In Snowsight, confirm RAW.LOGS and RAW.LOAD_LOGS_ENHANCED are owned by SYSADMIN.</span></p>",
        "code": "USE ROLE ACCOUNTADMIN;\n\n GRANT EXECUTE TASK ON ACCOUNT TO ROLE SYSADMIN;\n\n -- Run only if LOGS is not owned by SYSADMIN.\n GRANT OWNERSHIP ON VIEW AGS_GAME_AUDIENCE.RAW.LOGS\n TO ROLE SYSADMIN\n COPY CURRENT GRANTS;\n\n USE ROLE SYSADMIN;",
        "codeLang": "sql",
        "image": "https://ik.imagekit.io/atominc/labdocs/steps/1785082308633_Screenshot_2026-07-26_214131_h_aRExjug.png",
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "77744fdf13",
          "html": "<p><span><strong>OWNERSHIP  </strong></span><span>The task owner needs privileges on every referenced object. The course commonly fails when RAW.LOGS was accidentally created under ACCOUNTADMIN.</span></p><p><span><strong>CHECKPOINT  </strong></span><span>In Snowsight, confirm RAW.LOGS and RAW.LOAD_LOGS_ENHANCED are owned by SYSADMIN.</span></p>"
         },
         {
          "type": "snippet",
          "id": "1854b1198d",
          "lang": "sql",
          "code": "USE ROLE ACCOUNTADMIN;\n\n GRANT EXECUTE TASK ON ACCOUNT TO ROLE SYSADMIN;\n\n -- Run only if LOGS is not owned by SYSADMIN.\n GRANT OWNERSHIP ON VIEW AGS_GAME_AUDIENCE.RAW.LOGS\n TO ROLE SYSADMIN\n COPY CURRENT GRANTS;\n\n USE ROLE SYSADMIN;",
          "label": null
         },
         {
          "type": "image",
          "id": "543c226828",
          "url": "https://ik.imagekit.io/atominc/labdocs/steps/1785082308633_Screenshot_2026-07-26_214131_h_aRExjug.png",
          "caption": null
         }
        ]
       },
       {
        "title": "Replace the Task with the Final MERGE",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>DESCRIBE TASK shows a MERGE definition and SYSADMIN ownership.</span></p>",
        "code": "CREATE OR REPLACE TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED\n WAREHOUSE = COMPUTE_WH\n SCHEDULE = '5 minute'\n AS\n MERGE INTO AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED e\n USING (\n \tSELECT logs.ip_address,\n        \tlogs.user_login AS gamer_name,\n        \tlogs.user_event AS game_event_name,\n        \tlogs.datetime_iso8601 AS game_event_utc,\n        \tloc.city, loc.region, loc.country,\n        \tloc.timezone AS gamer_ltz_name,\n            CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601)\n            \tAS game_event_ltz,\n        \tDAYNAME(game_event_ltz) AS dow_name,\n        \ttod.tod_name\n \tFROM AGS_GAME_AUDIENCE.RAW.LOGS logs\n \tJOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   \tON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address)=loc.join_key\n  \tAND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n      \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n \tJOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU tod\n   \tON HOUR(CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601))\n      \t= tod.hour\n ) r\n ON  r.gamer_name = e.gamer_name\n AND r.game_event_utc = e.game_event_utc\n AND r.game_event_name = e.game_event_name\n WHEN NOT MATCHED THEN INSERT (\n \tip_address, gamer_name, game_event_name, game_event_utc,\n \tcity, region, country, gamer_ltz_name, game_event_ltz,\n \tdow_name, tod_name\n ) VALUES (\n \tr.ip_address, r.gamer_name, r.game_event_name, r.game_event_utc,\n \tr.city, r.region, r.country, r.gamer_ltz_name, r.game_event_ltz,\n \tr.dow_name, r.tod_name\n );\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "fe7c328bd7",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>DESCRIBE TASK shows a MERGE definition and SYSADMIN ownership.</span></p>"
         },
         {
          "type": "snippet",
          "id": "87a89a0a59",
          "lang": "sql",
          "code": "CREATE OR REPLACE TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED\n WAREHOUSE = COMPUTE_WH\n SCHEDULE = '5 minute'\n AS\n MERGE INTO AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED e\n USING (\n \tSELECT logs.ip_address,\n        \tlogs.user_login AS gamer_name,\n        \tlogs.user_event AS game_event_name,\n        \tlogs.datetime_iso8601 AS game_event_utc,\n        \tloc.city, loc.region, loc.country,\n        \tloc.timezone AS gamer_ltz_name,\n            CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601)\n            \tAS game_event_ltz,\n        \tDAYNAME(game_event_ltz) AS dow_name,\n        \ttod.tod_name\n \tFROM AGS_GAME_AUDIENCE.RAW.LOGS logs\n \tJOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   \tON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address)=loc.join_key\n  \tAND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n      \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n \tJOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU tod\n   \tON HOUR(CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601))\n      \t= tod.hour\n ) r\n ON  r.gamer_name = e.gamer_name\n AND r.game_event_utc = e.game_event_utc\n AND r.game_event_name = e.game_event_name\n WHEN NOT MATCHED THEN INSERT (\n \tip_address, gamer_name, game_event_name, game_event_utc,\n \tcity, region, country, gamer_ltz_name, game_event_ltz,\n \tdow_name, tod_name\n ) VALUES (\n \tr.ip_address, r.gamer_name, r.game_event_name, r.game_event_utc,\n \tr.city, r.region, r.country, r.gamer_ltz_name, r.game_event_ltz,\n \tr.dow_name, r.tod_name\n );\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "Execute and Verify the Task",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>At least one task-history row reports successful completion.<br>Expected: STATE = SUCCEEDED and ERROR_MESSAGE is empty.</span></p>",
        "code": "USE ROLE SYSADMIN;\n\n EXECUTE TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED;\n\n -- Wait briefly for completion, then check history.\n SELECT name, state, scheduled_time, completed_time, error_message\n FROM TABLE(AGS_GAME_AUDIENCE.INFORMATION_SCHEMA.TASK_HISTORY(\n \tTASK_NAME => 'LOAD_LOGS_ENHANCED',\n \tRESULT_LIMIT => 10\n ))\n ORDER BY scheduled_time DESC;\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "c1c9fdaa7c",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>At least one task-history row reports successful completion.<br>Expected: STATE = SUCCEEDED and ERROR_MESSAGE is empty.</span></p>"
         },
         {
          "type": "snippet",
          "id": "3cc9c1de4d",
          "lang": "sql",
          "code": "USE ROLE SYSADMIN;\n\n EXECUTE TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED;\n\n -- Wait briefly for completion, then check history.\n SELECT name, state, scheduled_time, completed_time, error_message\n FROM TABLE(AGS_GAME_AUDIENCE.INFORMATION_SCHEMA.TASK_HISTORY(\n \tTASK_NAME => 'LOAD_LOGS_ENHANCED',\n \tRESULT_LIMIT => 10\n ))\n ORDER BY scheduled_time DESC;\n\n",
          "label": null
         },
         {
          "type": "snippet",
          "id": "31da4e7236",
          "lang": "sql",
          "code": "SELECT COUNT(*) AS count_before FROM AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED;\n EXECUTE TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED;\n SELECT COUNT(*) AS count_after FROM AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED;\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "Optional New-Row Test",
        "description": "<p><span><strong>SAMPLE LIMITATION  </strong></span><span>The free IPInfo share may not contain the fake IP, so the row might not enrich. Cleanup both RAW and ENHANCED tables regardless.</span></p>",
        "code": "INSERT INTO AGS_GAME_AUDIENCE.RAW.GAME_LOGS\n SELECT PARSE_JSON('{\"datetime_iso8601\":\"2025-01-01 00:00:00.000\",\n  \"ip_address\":\"196.197.196.255\", \"user_event\":\"fake event\",\n  \"user_login\":\"fake user\"}');\n\n EXECUTE TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED;\n\n SELECT * FROM AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED\n WHERE gamer_name = 'fake user';\n\n DELETE FROM AGS_GAME_AUDIENCE.RAW.GAME_LOGS\n WHERE raw_log LIKE '%fake user%';\n\n DELETE FROM AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED\n WHERE gamer_name = 'fake user';\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "6dd6e1f6b4",
          "html": "<p><span><strong>SAMPLE LIMITATION  </strong></span><span>The free IPInfo share may not contain the fake IP, so the row might not enrich. Cleanup both RAW and ENHANCED tables regardless.</span></p>"
         },
         {
          "type": "snippet",
          "id": "058ce3c9f6",
          "lang": "sql",
          "code": "INSERT INTO AGS_GAME_AUDIENCE.RAW.GAME_LOGS\n SELECT PARSE_JSON('{\"datetime_iso8601\":\"2025-01-01 00:00:00.000\",\n  \"ip_address\":\"196.197.196.255\", \"user_event\":\"fake event\",\n  \"user_login\":\"fake user\"}');\n\n EXECUTE TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED;\n\n SELECT * FROM AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED\n WHERE gamer_name = 'fake user';\n\n DELETE FROM AGS_GAME_AUDIENCE.RAW.GAME_LOGS\n WHERE raw_log LIKE '%fake user%';\n\n DELETE FROM AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED\n WHERE gamer_name = 'fake user';\n\n",
          "label": null
         }
        ]
       }
      ]
     },
     {
      "title": "We Have a Pipeline!",
      "overview": null,
      "explanation": "<p>In this lab, we will build an automated data pipeline in Snowflake to continuously ingest, process, and enrich game activity data stored as JSON files. The pipeline uses an external stage to access incoming files, a raw table and parsing view to prepare the data, and a <code>MERGE</code> operation to load enriched records into the final table. Snowflake serverless tasks are then connected as a task graph so that new files are loaded every five minutes and processed automatically. The lab also includes resource monitoring, task-history validation, and a DORA check to confirm that the pipeline executes successfully according to its schedule.</p>",
      "output": "<p><span><strong>Run the DORA Check</strong></span></p><table><colgroup><col></colgroup><tbody><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"586\"><p><span><strong>CHECKPOINT  </strong></span><span>The GRADER result reports a pass for DNGW05.</span></p></td></tr><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"586\"><p><span><strong>AFTER PASSING  </strong></span><span>Suspend both tasks when you finish learning to conserve credits.</span></p></td></tr></tbody></table>",
      "outputCode": "SELECT GRADER(step, (actual = expected), actual, expected, description)\n    \tAS graded_results\n FROM (\n \tSELECT\n     \t'DNGW05' AS step,\n     \t(\n         \tSELECT MAX(tally)\n         \tFROM (\n             \tSELECT CASE\n                 \tWHEN scheduled_from = 'SCHEDULE' AND state = 'SUCCEEDED'\n                 \tTHEN 1 ELSE 0\n             \tEND AS tally\n             \tFROM TABLE(AGS_GAME_AUDIENCE.INFORMATION_SCHEMA.TASK_HISTORY(\n                 \tTASK_NAME => 'GET_NEW_FILES'\n             \t))\n         \t)\n     \t) AS actual,\n     \t1 AS expected,\n     \t'Task succeeds from schedule' AS description\n );\n\n",
      "flow": [
       {
        "id": "92573a0b8a",
        "label": "Goto Lab Worksheet",
        "type": "start"
       },
       {
        "id": "bf2c671f53",
        "label": "Verify Previous Tasks & Data",
        "type": "decision"
       },
       {
        "id": "487cced32f",
        "label": "Create External Staging",
        "type": "process"
       },
       {
        "id": "9dc3eb869c",
        "label": "Refresh & Verify Staging Data",
        "type": "decision"
       },
       {
        "id": "0d5a1ee8a1",
        "label": "Create 'PL_GAME_LOGS' Table",
        "type": "process"
       },
       {
        "id": "00cf32f354",
        "label": "Copy Data to 'PL_GAME_LOGS' Table",
        "type": "io"
       },
       {
        "id": "1c0d61f89e",
        "label": "Create 'GET_NEW_FILES' Task",
        "type": "process"
       },
       {
        "id": "4c7ebb78dd",
        "label": "Execute 'GET_NEW_FILES' Task",
        "type": "io"
       },
       {
        "id": "5aa9f15f0f",
        "label": "Create 'PL_LOGS' Table & Add Data",
        "type": "process"
       },
       {
        "id": "ff89590026",
        "label": "Verify 'PL_LOGS' Row Count",
        "type": "decision"
       },
       {
        "id": "39ba50b28e",
        "label": "Point the MERGE Pipeline at PL_LOGS",
        "type": "process"
       },
       {
        "id": "4b86b5d9d4",
        "label": "Create 'PIPELINE_DAILY_RM' Resource Moniter",
        "type": "process"
       },
       {
        "id": "67025b898b",
        "label": "Test the Two-Task Pipeline",
        "type": "process"
       },
       {
        "id": "9b1ed01a5f",
        "label": "Grant Task Privilege to 'SYSADMIN'",
        "type": "process"
       },
       {
        "id": "94e7b3c045",
        "label": "Create 'GET_NEW_FILES' with Ingestion",
        "type": "io"
       },
       {
        "id": "2c4480854d",
        "label": "Create 'LOAD_LOGS_ENHANCED' with Ingestion",
        "type": "io"
       },
       {
        "id": "9853265539",
        "label": "Resume & Verify Tasks",
        "type": "decision"
       },
       {
        "id": "d4d5276179",
        "label": "Verify scheduled history",
        "type": "decision"
       },
       {
        "id": "7a7708878a",
        "label": "Wait for Task Execution",
        "type": "process"
       },
       {
        "id": "5773c69db5",
        "label": "Run DORA",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Confirm DNGW04 and Set Context",
        "description": "<p>This code sets the active role to <code>SYSADMIN</code> and selects the <code>AGS_GAME_AUDIENCE</code> database and <code>RAW</code> schema as the working context. It then verifies whether the <code>LOAD_LOGS_ENHANCED</code> task exists and checks the current number of records available in the <code>LOGS_ENHANCED</code> table. This confirms that the previous lab setup has been completed successfully before building the new pipeline.</p>",
        "code": "USE ROLE SYSADMIN;\n \n USE DATABASE AGS_GAME_AUDIENCE;\n USE SCHEMA RAW;\n\n SHOW TASKS LIKE 'LOAD_LOGS_ENHANCED' IN SCHEMA AGS_GAME_AUDIENCE.RAW;\n SELECT COUNT(*) FROM AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED;\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "f424e56e99",
          "html": "<p>This code sets the active role to <code>SYSADMIN</code> and selects the <code>AGS_GAME_AUDIENCE</code> database and <code>RAW</code> schema as the working context. It then verifies whether the <code>LOAD_LOGS_ENHANCED</code> task exists and checks the current number of records available in the <code>LOGS_ENHANCED</code> table. This confirms that the previous lab setup has been completed successfully before building the new pipeline.</p>"
         },
         {
          "type": "snippet",
          "id": "f925fe4422",
          "lang": "sql",
          "code": "USE ROLE SYSADMIN;\n \n USE DATABASE AGS_GAME_AUDIENCE;\n USE SCHEMA RAW;\n\n SHOW TASKS LIKE 'LOAD_LOGS_ENHANCED' IN SCHEMA AGS_GAME_AUDIENCE.RAW;\n SELECT COUNT(*) FROM AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED;\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "Create the Pipeline Stage",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>The stage lists JSON files whose names follow logs_&lt;range&gt;_0_0_0.json. The number varies by UTC time of day.</span></p><p><span><strong><mark data-color=\"#b6d7a8\">MIDNIGHT RESET  </mark></strong></span><span><mark data-color=\"#b6d7a8\">The course bucket is cleared at midnight UTC and then receives a new 10-row file every five minutes. Row/file counts will vary.</mark></span></p><p>This code creates an external stage named <code>UNI_KISHORE_PIPELINE</code> that connects Snowflake to the specified Amazon S3 bucket. Directory table support is enabled so Snowflake can maintain information about the files stored in the stage. The stage is refreshed to retrieve the latest file metadata, and the <code>LIST</code> command displays the JSON files currently available in the bucket.</p>",
        "code": "CREATE OR REPLACE STAGE AGS_GAME_AUDIENCE.RAW.UNI_KISHORE_PIPELINE\n URL = 's3://uni-kishore-pipeline'\n DIRECTORY = (ENABLE = TRUE);\n\n ALTER STAGE AGS_GAME_AUDIENCE.RAW.UNI_KISHORE_PIPELINE REFRESH;\n\n LIST @AGS_GAME_AUDIENCE.RAW.UNI_KISHORE_PIPELINE;\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "e3d22e59df",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>The stage lists JSON files whose names follow logs_&lt;range&gt;_0_0_0.json. The number varies by UTC time of day.</span></p><p><span><strong><mark data-color=\"#b6d7a8\">MIDNIGHT RESET  </mark></strong></span><span><mark data-color=\"#b6d7a8\">The course bucket is cleared at midnight UTC and then receives a new 10-row file every five minutes. Row/file counts will vary.</mark></span></p><p>This code creates an external stage named <code>UNI_KISHORE_PIPELINE</code> that connects Snowflake to the specified Amazon S3 bucket. Directory table support is enabled so Snowflake can maintain information about the files stored in the stage. The stage is refreshed to retrieve the latest file metadata, and the <code>LIST</code> command displays the JSON files currently available in the bucket.</p>"
         },
         {
          "type": "snippet",
          "id": "02dd149dcb",
          "lang": "sql",
          "code": "CREATE OR REPLACE STAGE AGS_GAME_AUDIENCE.RAW.UNI_KISHORE_PIPELINE\n URL = 's3://uni-kishore-pipeline'\n DIRECTORY = (ENABLE = TRUE);\n\n ALTER STAGE AGS_GAME_AUDIENCE.RAW.UNI_KISHORE_PIPELINE REFRESH;\n\n LIST @AGS_GAME_AUDIENCE.RAW.UNI_KISHORE_PIPELINE;\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "Create the Pipeline Raw Table and COPY",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>PL_GAME_LOGS has one VARIANT column named RAW_LOG and starts empty.</span></p>",
        "code": "CREATE OR REPLACE TABLE AGS_GAME_AUDIENCE.RAW.PL_GAME_LOGS\n LIKE AGS_GAME_AUDIENCE.RAW.GAME_LOGS;\n\n DESCRIBE TABLE AGS_GAME_AUDIENCE.RAW.PL_GAME_LOGS;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "7467ae05a7",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>PL_GAME_LOGS has one VARIANT column named RAW_LOG and starts empty.</span></p>"
         },
         {
          "type": "snippet",
          "id": "3b1a2c0546",
          "lang": "sql",
          "code": "CREATE OR REPLACE TABLE AGS_GAME_AUDIENCE.RAW.PL_GAME_LOGS\n LIKE AGS_GAME_AUDIENCE.RAW.GAME_LOGS;\n\n DESCRIBE TABLE AGS_GAME_AUDIENCE.RAW.PL_GAME_LOGS;",
          "label": null
         },
         {
          "type": "snippet",
          "id": "6eb1edccab",
          "lang": "sql",
          "code": "COPY INTO AGS_GAME_AUDIENCE.RAW.PL_GAME_LOGS\n FROM @AGS_GAME_AUDIENCE.RAW.UNI_KISHORE_PIPELINE\n FILE_FORMAT = (FORMAT_NAME = AGS_GAME_AUDIENCE.RAW.FF_JSON_LOGS);",
          "label": null
         }
        ]
       },
       {
        "title": "Create and Test GET_NEW_FILES",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>A manual run succeeds and new files, if present, are added to PL_GAME_LOGS.</span></p><p><span><strong>INTERMEDIATE VERSION  </strong></span><span>The final task will be changed to serverless and five minutes later in this manual.</span></p>",
        "code": "CREATE OR REPLACE TASK AGS_GAME_AUDIENCE.RAW.GET_NEW_FILES\n \n SCHEDULE = '10 minute'\n AS\n COPY INTO AGS_GAME_AUDIENCE.RAW.PL_GAME_LOGS\n FROM @AGS_GAME_AUDIENCE.RAW.UNI_KISHORE_PIPELINE\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "9c842610a2",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>A manual run succeeds and new files, if present, are added to PL_GAME_LOGS.</span></p><p><span><strong>INTERMEDIATE VERSION  </strong></span><span>The final task will be changed to serverless and five minutes later in this manual.</span></p>"
         },
         {
          "type": "snippet",
          "id": "14dca2e71f",
          "lang": "sql",
          "code": "CREATE OR REPLACE TASK AGS_GAME_AUDIENCE.RAW.GET_NEW_FILES\n \n SCHEDULE = '10 minute'\n AS\n COPY INTO AGS_GAME_AUDIENCE.RAW.PL_GAME_LOGS\n FROM @AGS_GAME_AUDIENCE.RAW.UNI_KISHORE_PIPELINE\n",
          "label": null
         },
         {
          "type": "snippet",
          "id": "dce2450590",
          "lang": "sql",
          "code": "EXECUTE TASK AGS_GAME_AUDIENCE.RAW.GET_NEW_FILES;\n\n SELECT name, state, error_message\n FROM TABLE(AGS_GAME_AUDIENCE.INFORMATION_SCHEMA.TASK_HISTORY(\n \tTASK_NAME => 'GET_NEW_FILES', RESULT_LIMIT => 10\n ))\n ORDER BY scheduled_time DESC;",
          "label": null
         }
        ]
       },
       {
        "title": "Create the PL_LOGS Parsing View",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>PL_LOGS parses the pipeline table and returns IP_ADDRESS, USER_EVENT, USER_LOGIN, DATETIME_ISO8601, and RAW_LOG.</span></p>",
        "code": "CREATE OR REPLACE VIEW AGS_GAME_AUDIENCE.RAW.PL_LOGS AS\n SELECT\n \traw_log:ip_address::TEXT AS ip_address,\n \traw_log:user_event::TEXT AS user_event,\n \traw_log:user_login::TEXT AS user_login,\n     raw_log:datetime_iso8601::TIMESTAMP_NTZ AS datetime_iso8601,\n \traw_log\n FROM AGS_GAME_AUDIENCE.RAW.PL_GAME_LOGS\n WHERE raw_log:ip_address::TEXT IS NOT NULL;\n\n SELECT COUNT(*) AS pl_logs_rows FROM AGS_GAME_AUDIENCE.RAW.PL_LOGS;\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "8496552cc9",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>PL_LOGS parses the pipeline table and returns IP_ADDRESS, USER_EVENT, USER_LOGIN, DATETIME_ISO8601, and RAW_LOG.</span></p>"
         },
         {
          "type": "snippet",
          "id": "272d623a81",
          "lang": "sql",
          "code": "CREATE OR REPLACE VIEW AGS_GAME_AUDIENCE.RAW.PL_LOGS AS\n SELECT\n \traw_log:ip_address::TEXT AS ip_address,\n \traw_log:user_event::TEXT AS user_event,\n \traw_log:user_login::TEXT AS user_login,\n     raw_log:datetime_iso8601::TIMESTAMP_NTZ AS datetime_iso8601,\n \traw_log\n FROM AGS_GAME_AUDIENCE.RAW.PL_GAME_LOGS\n WHERE raw_log:ip_address::TEXT IS NOT NULL;\n\n SELECT COUNT(*) AS pl_logs_rows FROM AGS_GAME_AUDIENCE.RAW.PL_LOGS;\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "Point the MERGE Pipeline at PL_LOGS",
        "description": "<p><span><strong><mark data-color=\"#ffffff\">SOURCE CHANGE  </mark></strong></span><span><mark data-color=\"#ffffff\">Only the source view changes from RAW.LOGS to </mark></span><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"http://RAW.PL\"><span><mark data-color=\"#ffffff\">RAW.PL</mark></span></a><span><mark data-color=\"#ffffff\">_LOGS. The target remains ENHANCED.LOGS_ENHANCED.</mark></span></p>",
        "code": "MERGE INTO AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED e\n USING (\n \tSELECT logs.ip_address,\n        \tlogs.user_login AS gamer_name,\n        \tlogs.user_event AS game_event_name,\n        \tlogs.datetime_iso8601 AS game_event_utc,\n        \tloc.city, loc.region, loc.country,\n        \tloc.timezone AS gamer_ltz_name,\n            CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601)\n            \tAS game_event_ltz,\n        \tDAYNAME(game_event_ltz) AS dow_name,\n        \ttod.tod_name\n \tFROM AGS_GAME_AUDIENCE.RAW.PL_LOGS logs\n \tJOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   \tON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address)=loc.join_key\n  \tAND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n      \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n \tJOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU tod\n   \tON HOUR(CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601))\n      \t= tod.hour\n ) r\n ON  r.gamer_name=e.gamer_name\n AND r.game_event_utc=e.game_event_utc\n AND r.game_event_name=e.game_event_name\n WHEN NOT MATCHED THEN INSERT (\n  ip_address,gamer_name,game_event_name,game_event_utc,city,region,country,\n  gamer_ltz_name,game_event_ltz,dow_name,tod_name\n ) VALUES (\n  r.ip_address,r.gamer_name,r.game_event_name,r.game_event_utc,r.city,\n  r.region,r.country,r.gamer_ltz_name,r.game_event_ltz,r.dow_name,r.tod_name\n );\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "0713f0c302",
          "html": "<p><span><strong><mark data-color=\"#ffffff\">SOURCE CHANGE  </mark></strong></span><span><mark data-color=\"#ffffff\">Only the source view changes from RAW.LOGS to </mark></span><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"http://RAW.PL\"><span><mark data-color=\"#ffffff\">RAW.PL</mark></span></a><span><mark data-color=\"#ffffff\">_LOGS. The target remains ENHANCED.LOGS_ENHANCED.</mark></span></p>"
         },
         {
          "type": "snippet",
          "id": "b16dc828af",
          "lang": "sql",
          "code": "MERGE INTO AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED e\n USING (\n \tSELECT logs.ip_address,\n        \tlogs.user_login AS gamer_name,\n        \tlogs.user_event AS game_event_name,\n        \tlogs.datetime_iso8601 AS game_event_utc,\n        \tloc.city, loc.region, loc.country,\n        \tloc.timezone AS gamer_ltz_name,\n            CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601)\n            \tAS game_event_ltz,\n        \tDAYNAME(game_event_ltz) AS dow_name,\n        \ttod.tod_name\n \tFROM AGS_GAME_AUDIENCE.RAW.PL_LOGS logs\n \tJOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   \tON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address)=loc.join_key\n  \tAND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n      \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n \tJOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU tod\n   \tON HOUR(CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601))\n      \t= tod.hour\n ) r\n ON  r.gamer_name=e.gamer_name\n AND r.game_event_utc=e.game_event_utc\n AND r.game_event_name=e.game_event_name\n WHEN NOT MATCHED THEN INSERT (\n  ip_address,gamer_name,game_event_name,game_event_utc,city,region,country,\n  gamer_ltz_name,game_event_ltz,dow_name,tod_name\n ) VALUES (\n  r.ip_address,r.gamer_name,r.game_event_name,r.game_event_utc,r.city,\n  r.region,r.country,r.gamer_ltz_name,r.game_event_ltz,r.dow_name,r.tod_name\n );\n",
          "label": null
         }
        ]
       },
       {
        "title": "Create a Daily Resource Monitor",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>PIPELINE_DAILY_RM has a daily quota of one credit and is assigned to COMPUTE_WH.</span></p><p><span><strong>COST SAFETY  </strong></span><span>Always suspend learning tasks when finished. If the monitor stops work for the day, increase the quota deliberately only when more lab time is needed.</span></p>",
        "code": "USE ROLE ACCOUNTADMIN;\n\n CREATE OR REPLACE RESOURCE MONITOR PIPELINE_DAILY_RM\n WITH CREDIT_QUOTA = 1\n FREQUENCY = DAILY\n START_TIMESTAMP = IMMEDIATELY\n TRIGGERS ON 100 PERCENT DO SUSPEND_IMMEDIATE;\n\n ALTER WAREHOUSE COMPUTE_WH\n SET RESOURCE_MONITOR = PIPELINE_DAILY_RM;\n\n USE ROLE SYSADMIN;\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "91508e8d0e",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>PIPELINE_DAILY_RM has a daily quota of one credit and is assigned to COMPUTE_WH.</span></p><p><span><strong>COST SAFETY  </strong></span><span>Always suspend learning tasks when finished. If the monitor stops work for the day, increase the quota deliberately only when more lab time is needed.</span></p>"
         },
         {
          "type": "snippet",
          "id": "5141ebf2d2",
          "lang": "sql",
          "code": "USE ROLE ACCOUNTADMIN;\n\n CREATE OR REPLACE RESOURCE MONITOR PIPELINE_DAILY_RM\n WITH CREDIT_QUOTA = 1\n FREQUENCY = DAILY\n START_TIMESTAMP = IMMEDIATELY\n TRIGGERS ON 100 PERCENT DO SUSPEND_IMMEDIATE;\n\n ALTER WAREHOUSE COMPUTE_WH\n SET RESOURCE_MONITOR = PIPELINE_DAILY_RM;\n\n USE ROLE SYSADMIN;\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "Test the Two-Task Pipeline",
        "description": "<p><span><strong>TEMPORARY SCHEDULES  </strong></span><span>At this intermediate stage, both tasks may have independent schedules. The final design makes LOAD_LOGS_ENHANCED dependent on GET_NEW_FILES.</span></p>",
        "code": "TRUNCATE TABLE AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED;\n\n ALTER TASK AGS_GAME_AUDIENCE.RAW.GET_NEW_FILES RESUME;\n ALTER TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED RESUME;\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "d937e47063",
          "html": "<p><span><strong>TEMPORARY SCHEDULES  </strong></span><span>At this intermediate stage, both tasks may have independent schedules. The final design makes LOAD_LOGS_ENHANCED dependent on GET_NEW_FILES.</span></p>"
         },
         {
          "type": "snippet",
          "id": "671620b274",
          "lang": "sql",
          "code": "TRUNCATE TABLE AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED;\n\n ALTER TASK AGS_GAME_AUDIENCE.RAW.GET_NEW_FILES RESUME;\n ALTER TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED RESUME;\n\n",
          "label": null
         },
         {
          "type": "snippet",
          "id": "c3c8ccab35",
          "lang": "sql",
          "code": "LIST @AGS_GAME_AUDIENCE.RAW.UNI_KISHORE_PIPELINE;\n SELECT COUNT(*) AS raw_rows FROM AGS_GAME_AUDIENCE.RAW.PL_GAME_LOGS;\n SELECT COUNT(*) AS parsed_rows FROM AGS_GAME_AUDIENCE.RAW.PL_LOGS;\n SELECT COUNT(*) AS enhanced_rows FROM AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED;\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "Grant Serverless Privilege",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>SYSADMIN can create and operate serverless tasks.</span></p><p><span><strong>SERVERLESS SETTING  </strong></span><span>USER_TASK_MANAGED_INITIAL_WAREHOUSE_SIZE replaces WAREHOUSE. Never specify both in the same task.</span></p>",
        "code": "USE ROLE ACCOUNTADMIN;\n GRANT EXECUTE MANAGED TASK ON ACCOUNT TO ROLE SYSADMIN;\n USE ROLE SYSADMIN;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "52a6863dc6",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>SYSADMIN can create and operate serverless tasks.</span></p><p><span><strong>SERVERLESS SETTING  </strong></span><span>USER_TASK_MANAGED_INITIAL_WAREHOUSE_SIZE replaces WAREHOUSE. Never specify both in the same task.</span></p>"
         },
         {
          "type": "snippet",
          "id": "8ef9dbb0be",
          "lang": "sql",
          "code": "USE ROLE ACCOUNTADMIN;\n GRANT EXECUTE MANAGED TASK ON ACCOUNT TO ROLE SYSADMIN;\n USE ROLE SYSADMIN;",
          "label": null
         }
        ]
       },
       {
        "title": "Create the Final Serverless Task Graph",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>Task graph: GET_NEW_FILES → LOAD_LOGS_ENHANCED. Both are serverless and owned by SYSADMIN.</span></p>",
        "code": "CREATE OR REPLACE TASK AGS_GAME_AUDIENCE.RAW.GET_NEW_FILES\n SCHEDULE = '5 minute'\n USER_TASK_MANAGED_INITIAL_WAREHOUSE_SIZE = 'XSMALL'\n AS\n COPY INTO AGS_GAME_AUDIENCE.RAW.PL_GAME_LOGS\n FROM @AGS_GAME_AUDIENCE.RAW.UNI_KISHORE_PIPELINE\n FILE_FORMAT = (FORMAT_NAME = AGS_GAME_AUDIENCE.RAW.FF_JSON_LOGS);\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "84f2457a92",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>Task graph: GET_NEW_FILES → LOAD_LOGS_ENHANCED. Both are serverless and owned by SYSADMIN.</span></p>"
         },
         {
          "type": "snippet",
          "id": "4a36dbfb3f",
          "lang": "sql",
          "code": "CREATE OR REPLACE TASK AGS_GAME_AUDIENCE.RAW.GET_NEW_FILES\n SCHEDULE = '5 minute'\n USER_TASK_MANAGED_INITIAL_WAREHOUSE_SIZE = 'XSMALL'\n AS\n COPY INTO AGS_GAME_AUDIENCE.RAW.PL_GAME_LOGS\n FROM @AGS_GAME_AUDIENCE.RAW.UNI_KISHORE_PIPELINE\n FILE_FORMAT = (FORMAT_NAME = AGS_GAME_AUDIENCE.RAW.FF_JSON_LOGS);\n\n",
          "label": null
         },
         {
          "type": "snippet",
          "id": "ead197d925",
          "lang": "sql",
          "code": "CREATE OR REPLACE TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED\n USER_TASK_MANAGED_INITIAL_WAREHOUSE_SIZE = 'XSMALL'\n AFTER AGS_GAME_AUDIENCE.RAW.GET_NEW_FILES\n AS\n MERGE INTO AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED e\n USING (\n  SELECT logs.ip_address, logs.user_login AS gamer_name,\n     \tlogs.user_event AS game_event_name,\n     \tlogs.datetime_iso8601 AS game_event_utc,\n         loc.city,loc.region,loc.country,loc.timezone AS gamer_ltz_name,\n         CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601)\n         \tAS game_event_ltz,\n     \tDAYNAME(game_event_ltz) AS dow_name,tod.tod_name\n  FROM AGS_GAME_AUDIENCE.RAW.PL_LOGS logs\n  JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n    ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address)=loc.join_key\n   AND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n   \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n  JOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU tod\n    ON HOUR(CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601))\n   \t=tod.hour\n ) r\n ON r.gamer_name=e.gamer_name AND r.game_event_utc=e.game_event_utc\n AND r.game_event_name=e.game_event_name\n WHEN NOT MATCHED THEN INSERT\n (ip_address,gamer_name,game_event_name,game_event_utc,city,region,country,\n  gamer_ltz_name,game_event_ltz,dow_name,tod_name)\n VALUES\n (r.ip_address,r.gamer_name,r.game_event_name,r.game_event_utc,r.city,\n  r.region,r.country,r.gamer_ltz_name,r.game_event_ltz,r.dow_name,r.tod_name);\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "Resume in Dependency Order",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>Both tasks show Started. GET_NEW_FILES has a schedule; LOAD_LOGS_ENHANCED shows its predecessor.</span></p>",
        "code": "-- Resume child first, then root.\n ALTER TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED RESUME;\n ALTER TASK AGS_GAME_AUDIENCE.RAW.GET_NEW_FILES RESUME;\n\n SHOW TASKS IN SCHEMA AGS_GAME_AUDIENCE.RAW;\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "49d8d3c3d1",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>Both tasks show Started. GET_NEW_FILES has a schedule; LOAD_LOGS_ENHANCED shows its predecessor.</span></p>"
         },
         {
          "type": "snippet",
          "id": "72ffc8f761",
          "lang": "sql",
          "code": "-- Resume child first, then root.\n ALTER TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED RESUME;\n ALTER TASK AGS_GAME_AUDIENCE.RAW.GET_NEW_FILES RESUME;\n\n SHOW TASKS IN SCHEMA AGS_GAME_AUDIENCE.RAW;\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "Check scheduled history",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>At least one GET_NEW_FILES row has STATE = SUCCEEDED and SCHEDULED_FROM = SCHEDULE.</span></p>",
        "code": "SELECT name,state,scheduled_from,scheduled_time,completed_time,error_message\n FROM TABLE(AGS_GAME_AUDIENCE.INFORMATION_SCHEMA.TASK_HISTORY(\n \tTASK_NAME => 'GET_NEW_FILES', RESULT_LIMIT => 20\n ))\n ORDER BY scheduled_time DESC;\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "06c49ee904",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>At least one GET_NEW_FILES row has STATE = SUCCEEDED and SCHEDULED_FROM = SCHEDULE.</span></p>"
         },
         {
          "type": "snippet",
          "id": "4e5c154e71",
          "lang": "sql",
          "code": "SELECT name,state,scheduled_from,scheduled_time,completed_time,error_message\n FROM TABLE(AGS_GAME_AUDIENCE.INFORMATION_SCHEMA.TASK_HISTORY(\n \tTASK_NAME => 'GET_NEW_FILES', RESULT_LIMIT => 20\n ))\n ORDER BY scheduled_time DESC;\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "wait for 5 minutes",
        "description": "<p><span><strong><mark data-color=\"#ff0000\">WAIT FOR DORA  </mark></strong><mark data-color=\"#ff0000\">Do not use only EXECUTE TASK. Wait at least one five-minute cycle until GET_NEW_FILES shows a SUCCEEDED run with SCHEDULED_FROM = SCHEDULE.</mark></span></p>",
        "code": null,
        "codeLang": null,
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "cdb0b3abee",
          "html": "<p><span><strong><mark data-color=\"#ff0000\">WAIT FOR DORA  </mark></strong><mark data-color=\"#ff0000\">Do not use only EXECUTE TASK. Wait at least one five-minute cycle until GET_NEW_FILES shows a SUCCEEDED run with SCHEDULED_FROM = SCHEDULE.</mark></span></p>"
         }
        ]
       }
      ]
     },
     {
      "title": "Time to Set Up YOUR Snowpipe!",
      "overview": null,
      "explanation": "<h2>Step-by-Step Explanation and Expected Output</h2><p>This lab creates a complete automated data pipeline using <strong>Snowpipe, Streams, Tasks, JSON parsing, and MERGE operations</strong>. New JSON files are automatically loaded into a raw table, detected through a CDC stream, enriched with location details, and transferred into the enhanced table</p>",
      "output": "<p><span><strong>Run the DORA Check</strong></span></p><p>The DORA grader verifies that <code>PIPE_GET_NEW_FILES</code> exists and is currently running.</p><p>The query retrieves the pipe status and checks the <code>executionState</code> property.</p><ul><li><p>When the state is <code>RUNNING</code>, the actual value becomes <code>1</code>.</p></li><li><p>The expected value is also <code>1</code>.</p></li><li><p>The <code>GRADER</code> function compares these values.</p></li></ul>",
      "outputCode": "SELECT GRADER(step, (actual = expected), actual, expected, description)\n    \tAS graded_results\n FROM (\n \tSELECT\n     \t'DNGW06' AS step,\n     \t(\n         \tSELECT CASE\n             \tWHEN pipe_status:executionState::TEXT = 'RUNNING'\n             \tTHEN 1 ELSE 0\n         \tEND\n         \tFROM (\n             \tSELECT PARSE_JSON(SYSTEM$PIPE_STATUS(\n                     'ags_game_audience.raw.PIPE_GET_NEW_FILES'\n             \t)) AS pipe_status\n         \t)\n     \t) AS actual,\n     \t1 AS expected,\n     \t'Pipe exists and is RUNNING' AS description\n );\n\n",
      "flow": [
       {
        "id": "fd76df21a5",
        "label": "Goto 'Lab' Worksheet",
        "type": "start"
       },
       {
        "id": "8373fa8b8c",
        "label": "Verify DNGW05",
        "type": "decision"
       },
       {
        "id": "06817fbae8",
        "label": " Preview Metadata & Parsed JSON",
        "type": "process"
       },
       {
        "id": "efe060acd6",
        "label": "Create 'ED_PIPELINE_LOGS' Table",
        "type": "process"
       },
       {
        "id": "c84ba8f0b4",
        "label": "Copy Data to 'ED_PIPELINE_LOGS'",
        "type": "io"
       },
       {
        "id": "b4519bc028",
        "label": "Suspend old Tasks",
        "type": "process"
       },
       {
        "id": "a90b9611e8",
        "label": "Create 'PIPE_GET_NEW_FILES' Pipe",
        "type": "process"
       },
       {
        "id": "0e0038899e",
        "label": "Start the Pipe",
        "type": "process"
       },
       {
        "id": "969360b33d",
        "label": "Verify Pipe Activity",
        "type": "decision"
       },
       {
        "id": "416b872cca",
        "label": "Truncate 'LOGS_ENHANCED' Table",
        "type": "process"
       },
       {
        "id": "18a8ac99a3",
        "label": "Merge LOGS_ENHANCED Table",
        "type": "io"
       },
       {
        "id": "e80f303aae",
        "label": "Create 'ED_CDC_STREAM' Stream",
        "type": "process"
       },
       {
        "id": "edc6b041de",
        "label": "Merge only changed rows",
        "type": "io"
       },
       {
        "id": "b09e47f785",
        "label": "Create the Conditional CDC Task",
        "type": "process"
       },
       {
        "id": "a7caaa6ef9",
        "label": "Confirm End-to-End Data Flow",
        "type": "decision"
       },
       {
        "id": "3905ac22f6",
        "label": "Run DORA",
        "type": "end"
       }
      ],
      "steps": [
       {
        "title": "Confirm DNGW05 and Set Context",
        "description": "<p><span><strong>STARTING STATE  </strong></span><span>PIPE_GET_NEW_FILES normally does not exist yet. An empty SHOW result is expected before pipe creation.</span></p><p>This step prepares the Snowflake worksheet by selecting the required role, warehouse, database, and schema.</p><ul><li><p><code>USE ROLE SYSADMIN</code> selects the system administrator role.</p></li><li><p><code>USE WAREHOUSE COMPUTE_WH</code> selects the warehouse used to execute queries.</p></li><li><p><code>USE DATABASE AGS_GAME_AUDIENCE</code> sets the working database.</p></li><li><p><code>USE SCHEMA RAW</code> selects the raw data schema.</p></li><li><p><code>SHOW PIPES</code> checks whether <code>PIPE_GET_NEW_FILES</code> already exists.</p></li></ul><p>At this stage, the pipe normally does not exist because it will be created later in the lab.</p>",
        "code": "USE ROLE SYSADMIN;\n USE WAREHOUSE COMPUTE_WH;\n USE DATABASE AGS_GAME_AUDIENCE;\n USE SCHEMA RAW;\n\n SHOW PIPES LIKE 'PIPE_GET_NEW_FILES'\n IN SCHEMA AGS_GAME_AUDIENCE.RAW;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "536b86870f",
          "html": "<p><span><strong>STARTING STATE  </strong></span><span>PIPE_GET_NEW_FILES normally does not exist yet. An empty SHOW result is expected before pipe creation.</span></p><p>This step prepares the Snowflake worksheet by selecting the required role, warehouse, database, and schema.</p><ul><li><p><code>USE ROLE SYSADMIN</code> selects the system administrator role.</p></li><li><p><code>USE WAREHOUSE COMPUTE_WH</code> selects the warehouse used to execute queries.</p></li><li><p><code>USE DATABASE AGS_GAME_AUDIENCE</code> sets the working database.</p></li><li><p><code>USE SCHEMA RAW</code> selects the raw data schema.</p></li><li><p><code>SHOW PIPES</code> checks whether <code>PIPE_GET_NEW_FILES</code> already exists.</p></li></ul><p>At this stage, the pipe normally does not exist because it will be created later in the lab.</p>"
         },
         {
          "type": "snippet",
          "id": "80c3fc679d",
          "lang": "sql",
          "code": "USE ROLE SYSADMIN;\n USE WAREHOUSE COMPUTE_WH;\n USE DATABASE AGS_GAME_AUDIENCE;\n USE SCHEMA RAW;\n\n SHOW PIPES LIKE 'PIPE_GET_NEW_FILES'\n IN SCHEMA AGS_GAME_AUDIENCE.RAW;",
          "label": null
         }
        ]
       },
       {
        "title": "Preview Metadata and Parsed JSON",
        "description": "<p><span><strong>CHECKPOINT  </strong></span><span>The query reads staged JSON without a parsing view and includes filename, file-row number, and load time.</span></p><p>This query previews the JSON files available in the external stage before loading them into a table.</p><p>The query extracts both Snowflake-generated metadata and values stored inside the JSON records.</p>",
        "code": "SELECT\n \tMETADATA$FILENAME AS log_file_name,\n \tMETADATA$FILE_ROW_NUMBER AS log_file_row_id,\n \tCURRENT_TIMESTAMP(0) AS load_ltz,\n     GET($1,'datetime_iso8601')::TIMESTAMP_NTZ AS datetime_iso8601,\n \tGET($1,'user_event')::TEXT AS user_event,\n \tGET($1,'user_login')::TEXT AS user_login,\n \tGET($1,'ip_address')::TEXT AS ip_address\n FROM @AGS_GAME_AUDIENCE.RAW.UNI_KISHORE_PIPELINE\n (FILE_FORMAT => 'AGS_GAME_AUDIENCE.RAW.FF_JSON_LOGS');\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "e605f9a7f9",
          "html": "<p><span><strong>CHECKPOINT  </strong></span><span>The query reads staged JSON without a parsing view and includes filename, file-row number, and load time.</span></p><p>This query previews the JSON files available in the external stage before loading them into a table.</p><p>The query extracts both Snowflake-generated metadata and values stored inside the JSON records.</p>"
         },
         {
          "type": "snippet",
          "id": "c118b3f79c",
          "lang": "sql",
          "code": "SELECT\n \tMETADATA$FILENAME AS log_file_name,\n \tMETADATA$FILE_ROW_NUMBER AS log_file_row_id,\n \tCURRENT_TIMESTAMP(0) AS load_ltz,\n     GET($1,'datetime_iso8601')::TIMESTAMP_NTZ AS datetime_iso8601,\n \tGET($1,'user_event')::TEXT AS user_event,\n \tGET($1,'user_login')::TEXT AS user_login,\n \tGET($1,'ip_address')::TEXT AS ip_address\n FROM @AGS_GAME_AUDIENCE.RAW.UNI_KISHORE_PIPELINE\n (FILE_FORMAT => 'AGS_GAME_AUDIENCE.RAW.FF_JSON_LOGS');\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "Create ED_PIPELINE_LOGS",
        "description": "<table><colgroup><col><col></colgroup><tbody><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"586\"><p><span><strong>EXPLICIT TYPES  </strong></span><span>CTAS would create very large VARCHAR columns. The</span></p><p><span>explicit definition keeps filenames/logins/IPs at 100 characters and USER_EVENT at 25.</span></p><p>This step creates the raw destination table that will receive the JSON records loaded through Snowpipe.</p><p>The columns are explicitly defined instead of creating the table through CTAS. Explicit definitions prevent Snowflake from creating unnecessarily large <code>VARCHAR</code> columns.</p><p>The table stores:</p><ul><li><p>Source filename</p></li><li><p>Source row number</p></li><li><p>Load timestamp</p></li><li><p>Event timestamp</p></li><li><p>User event</p></li><li><p>User login</p></li><li><p>IP address</p></li></ul></td><td colspan=\"1\" rowspan=\"1\" colwidth=\"25\"><p><span> </span></p></td></tr></tbody></table>",
        "code": "CREATE OR REPLACE TABLE AGS_GAME_AUDIENCE.RAW.ED_PIPELINE_LOGS (\n \tlog_file_name VARCHAR(100),\n \tlog_file_row_id NUMBER(18,0),\n \tload_ltz TIMESTAMP_LTZ(0),\n \tdatetime_iso8601 TIMESTAMP_NTZ(9),\n \tuser_event VARCHAR(25),\n \tuser_login VARCHAR(100),\n \tip_address VARCHAR(100)\n );\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "85b15f09e3",
          "html": "<table><colgroup><col><col></colgroup><tbody><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"586\"><p><span><strong>EXPLICIT TYPES  </strong></span><span>CTAS would create very large VARCHAR columns. The</span></p><p><span>explicit definition keeps filenames/logins/IPs at 100 characters and USER_EVENT at 25.</span></p><p>This step creates the raw destination table that will receive the JSON records loaded through Snowpipe.</p><p>The columns are explicitly defined instead of creating the table through CTAS. Explicit definitions prevent Snowflake from creating unnecessarily large <code>VARCHAR</code> columns.</p><p>The table stores:</p><ul><li><p>Source filename</p></li><li><p>Source row number</p></li><li><p>Load timestamp</p></li><li><p>Event timestamp</p></li><li><p>User event</p></li><li><p>User login</p></li><li><p>IP address</p></li></ul></td><td colspan=\"1\" rowspan=\"1\" colwidth=\"25\"><p><span> </span></p></td></tr></tbody></table>"
         },
         {
          "type": "snippet",
          "id": "fd91e9fb2e",
          "lang": "sql",
          "code": "CREATE OR REPLACE TABLE AGS_GAME_AUDIENCE.RAW.ED_PIPELINE_LOGS (\n \tlog_file_name VARCHAR(100),\n \tlog_file_row_id NUMBER(18,0),\n \tload_ltz TIMESTAMP_LTZ(0),\n \tdatetime_iso8601 TIMESTAMP_NTZ(9),\n \tuser_event VARCHAR(25),\n \tuser_login VARCHAR(100),\n \tip_address VARCHAR(100)\n );\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "Test the improved COPY INTO",
        "description": "<p><span><strong><mark data-color=\"#b6d7a8\">CHECKPOINT  </mark></strong><mark data-color=\"#b6d7a8\">ED_PIPELINE_LOGS contains parsed columns and source-file metadata.</mark></span></p><p>This step manually loads the staged JSON data into <code>ED_PIPELINE_LOGS</code>.</p><p>The <code>COPY INTO</code> command:</p><ol><li><p>Reads JSON files from the <code>UNI_KISHORE_PIPELINE</code> stage.</p></li><li><p>Extracts each required JSON property.</p></li><li><p>Adds source-file metadata.</p></li><li><p>Inserts the parsed values into the raw pipeline table.</p></li></ol><p>This manual test confirms that the same loading logic intended for Snowpipe works correctly before automating it.</p>",
        "code": "COPY INTO AGS_GAME_AUDIENCE.RAW.ED_PIPELINE_LOGS\n FROM (\n  SELECT METADATA$FILENAME,\n     \tMETADATA$FILE_ROW_NUMBER,\n     \tCURRENT_TIMESTAMP(0),\n         GET($1,'datetime_iso8601')::TIMESTAMP_NTZ,\n     \tGET($1,'user_event')::TEXT,\n     \tGET($1,'user_login')::TEXT,\n     \tGET($1,'ip_address')::TEXT\n  FROM @AGS_GAME_AUDIENCE.RAW.UNI_KISHORE_PIPELINE\n )\n FILE_FORMAT=(FORMAT_NAME=AGS_GAME_AUDIENCE.RAW.FF_JSON_LOGS);",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "8d0d25996a",
          "html": "<p><span><strong><mark data-color=\"#b6d7a8\">CHECKPOINT  </mark></strong><mark data-color=\"#b6d7a8\">ED_PIPELINE_LOGS contains parsed columns and source-file metadata.</mark></span></p><p>This step manually loads the staged JSON data into <code>ED_PIPELINE_LOGS</code>.</p><p>The <code>COPY INTO</code> command:</p><ol><li><p>Reads JSON files from the <code>UNI_KISHORE_PIPELINE</code> stage.</p></li><li><p>Extracts each required JSON property.</p></li><li><p>Adds source-file metadata.</p></li><li><p>Inserts the parsed values into the raw pipeline table.</p></li></ol><p>This manual test confirms that the same loading logic intended for Snowpipe works correctly before automating it.</p>"
         },
         {
          "type": "snippet",
          "id": "995b9e5dab",
          "lang": "sql",
          "code": "COPY INTO AGS_GAME_AUDIENCE.RAW.ED_PIPELINE_LOGS\n FROM (\n  SELECT METADATA$FILENAME,\n     \tMETADATA$FILE_ROW_NUMBER,\n     \tCURRENT_TIMESTAMP(0),\n         GET($1,'datetime_iso8601')::TIMESTAMP_NTZ,\n     \tGET($1,'user_event')::TEXT,\n     \tGET($1,'user_login')::TEXT,\n     \tGET($1,'ip_address')::TEXT\n  FROM @AGS_GAME_AUDIENCE.RAW.UNI_KISHORE_PIPELINE\n )\n FILE_FORMAT=(FORMAT_NAME=AGS_GAME_AUDIENCE.RAW.FF_JSON_LOGS);",
          "label": null
         }
        ]
       },
       {
        "title": "Stop the Old Polling Pipeline",
        "description": "<p><span><strong>WHY  </strong></span><span>GET_NEW_FILES is replaced by Snowpipe. LOAD_LOGS_ENHANCED is temporarily stopped while its source changes, then later replaced by a CDC task.</span></p><p><span><strong>CHECKPOINT  </strong></span><span>SHOW TASKS reports both old tasks suspended.</span></p><p>This step suspends the two existing scheduled tasks:</p><ul><li><p><code>GET_NEW_FILES</code></p></li><li><p><code>LOAD_LOGS_ENHANCED</code></p></li></ul><p>The old <code>GET_NEW_FILES</code> task uses scheduled polling to search for new files. It is no longer needed because Snowpipe will automatically detect and ingest incoming files.</p><p><code>LOAD_LOGS_ENHANCED</code> is also temporarily suspended because its source and processing method will be changed later to use CDC.</p><h3></h3>",
        "code": "ALTER TASK AGS_GAME_AUDIENCE.RAW.GET_NEW_FILES SUSPEND;\n ALTER TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED SUSPEND;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "907f737e74",
          "html": "<p><span><strong>WHY  </strong></span><span>GET_NEW_FILES is replaced by Snowpipe. LOAD_LOGS_ENHANCED is temporarily stopped while its source changes, then later replaced by a CDC task.</span></p><p><span><strong>CHECKPOINT  </strong></span><span>SHOW TASKS reports both old tasks suspended.</span></p><p>This step suspends the two existing scheduled tasks:</p><ul><li><p><code>GET_NEW_FILES</code></p></li><li><p><code>LOAD_LOGS_ENHANCED</code></p></li></ul><p>The old <code>GET_NEW_FILES</code> task uses scheduled polling to search for new files. It is no longer needed because Snowpipe will automatically detect and ingest incoming files.</p><p><code>LOAD_LOGS_ENHANCED</code> is also temporarily suspended because its source and processing method will be changed later to use CDC.</p><h3></h3>"
         },
         {
          "type": "snippet",
          "id": "1496b61154",
          "lang": "sql",
          "code": "ALTER TASK AGS_GAME_AUDIENCE.RAW.GET_NEW_FILES SUSPEND;\n ALTER TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED SUSPEND;",
          "label": null
         }
        ]
       },
       {
        "title": "Create the Auto-Ingest Snowpipe",
        "description": "<p>This is the central step of the lab. It creates the Snowpipe named <code>PIPE_GET_NEW_FILES</code>.</p><p>Important configurations include:</p><ul><li><p><code>AUTO_INGEST = TRUE</code> enables event-driven file loading.</p></li><li><p><code>AWS_SNS_TOPIC</code> connects Snowpipe to the specified AWS SNS topic.</p></li><li><p>The <code>COPY INTO</code> statement defines how new JSON files must be parsed and loaded.</p></li><li><p>The destination table is <code>ED_PIPELINE_LOGS</code>.</p></li></ul><p>When a new file arrives in the connected storage location, an event is sent through AWS SNS. Snowpipe receives that notification and automatically loads the file.</p>",
        "code": "CREATE OR REPLACE PIPE AGS_GAME_AUDIENCE.RAW.PIPE_GET_NEW_FILES\n AUTO_INGEST = TRUE\n AWS_SNS_TOPIC = 'arn:aws:sns:us-west-2:321463406630:dngw_topic'\n AS\n COPY INTO AGS_GAME_AUDIENCE.RAW.ED_PIPELINE_LOGS\n FROM (\n  SELECT METADATA$FILENAME,\n     \tMETADATA$FILE_ROW_NUMBER,\n     \tCURRENT_TIMESTAMP(0),\n        GET($1,'datetime_iso8601')::TIMESTAMP_NTZ,\n     \t GET($1,'user_event')::TEXT,\n     \t GET($1,'user_login')::TEXT,\n     \t GET($1,'ip_address')::TEXT\n  FROM @AGS_GAME_AUDIENCE.RAW.UNI_KISHORE_PIPELINE\n )\n FILE_FORMAT=(FORMAT_NAME=AGS_GAME_AUDIENCE.RAW.FF_JSON_LOGS);\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "snippet",
          "id": "a3fb75ef70",
          "lang": "sql",
          "code": "CREATE OR REPLACE PIPE AGS_GAME_AUDIENCE.RAW.PIPE_GET_NEW_FILES\n AUTO_INGEST = TRUE\n AWS_SNS_TOPIC = 'arn:aws:sns:us-west-2:321463406630:dngw_topic'\n AS\n COPY INTO AGS_GAME_AUDIENCE.RAW.ED_PIPELINE_LOGS\n FROM (\n  SELECT METADATA$FILENAME,\n     \tMETADATA$FILE_ROW_NUMBER,\n     \tCURRENT_TIMESTAMP(0),\n        GET($1,'datetime_iso8601')::TIMESTAMP_NTZ,\n     \t GET($1,'user_event')::TEXT,\n     \t GET($1,'user_login')::TEXT,\n     \t GET($1,'ip_address')::TEXT\n  FROM @AGS_GAME_AUDIENCE.RAW.UNI_KISHORE_PIPELINE\n )\n FILE_FORMAT=(FORMAT_NAME=AGS_GAME_AUDIENCE.RAW.FF_JSON_LOGS);\n\n",
          "label": null
         },
         {
          "type": "description",
          "id": "ebf5001f40",
          "html": "<p>This is the central step of the lab. It creates the Snowpipe named <code>PIPE_GET_NEW_FILES</code>.</p><p>Important configurations include:</p><ul><li><p><code>AUTO_INGEST = TRUE</code> enables event-driven file loading.</p></li><li><p><code>AWS_SNS_TOPIC</code> connects Snowpipe to the specified AWS SNS topic.</p></li><li><p>The <code>COPY INTO</code> statement defines how new JSON files must be parsed and loaded.</p></li><li><p>The destination table is <code>ED_PIPELINE_LOGS</code>.</p></li></ul><p>When a new file arrives in the connected storage location, an event is sent through AWS SNS. Snowpipe receives that notification and automatically loads the file.</p>"
         }
        ]
       },
       {
        "title": "Start/check the pipe",
        "description": "<p>CHECKPOINT  Inspect PIPE_STATUS.</p><p>Expected: executionState = RUNNING.</p><p>IF STALLED  Run ALTER PIPE AGS_GAME_AUDIENCE.RAW.PIPE_GET_NEW_FILES REFRESH; to queue eligible existing files, then recheck status.</p><p>The first command ensures that Snowpipe execution is not paused.</p><p>The second command uses SYSTEM$PIPE_STATUS to inspect the current operational state of the pipe.</p><p>PARSE_JSON converts the returned pipe-status text into a JSON object, making properties such as executionState easier to inspect.</p><p>When the pipe is working correctly, its execution state should be RUNNING.</p>",
        "code": "ALTER PIPE AGS_GAME_AUDIENCE.RAW.PIPE_GET_NEW_FILES\n SET PIPE_EXECUTION_PAUSED = FALSE;\n\n SELECT PARSE_JSON(SYSTEM$PIPE_STATUS(\n  'AGS_GAME_AUDIENCE.RAW.PIPE_GET_NEW_FILES')) AS pipe_status;",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "68cce2c32c",
          "html": "<p>CHECKPOINT  Inspect PIPE_STATUS.</p><p>Expected: executionState = RUNNING.</p><p>IF STALLED  Run ALTER PIPE AGS_GAME_AUDIENCE.RAW.PIPE_GET_NEW_FILES REFRESH; to queue eligible existing files, then recheck status.</p><p>The first command ensures that Snowpipe execution is not paused.</p><p>The second command uses SYSTEM$PIPE_STATUS to inspect the current operational state of the pipe.</p><p>PARSE_JSON converts the returned pipe-status text into a JSON object, making properties such as executionState easier to inspect.</p><p>When the pipe is working correctly, its execution state should be RUNNING.</p>"
         },
         {
          "type": "snippet",
          "id": "1448513254",
          "lang": "sql",
          "code": "ALTER PIPE AGS_GAME_AUDIENCE.RAW.PIPE_GET_NEW_FILES\n SET PIPE_EXECUTION_PAUSED = FALSE;\n\n SELECT PARSE_JSON(SYSTEM$PIPE_STATUS(\n  'AGS_GAME_AUDIENCE.RAW.PIPE_GET_NEW_FILES')) AS pipe_status;",
          "label": null
         }
        ]
       },
       {
        "title": "Verify Continuous Pipe Activity",
        "description": "<p>CHECKPOINT  New course files are processed by PIPE_GET_NEW_FILES. ED_RAW_ROWS should climb as files arrive.</p><p>This step verifies that Snowpipe is actively loading files.</p><p>ALTER PIPE ... REFRESH queues eligible existing files that Snowpipe has not previously loaded.</p><p>COUNT(*) checks the number of rows inside ED_PIPELINE_LOGS.</p><p>COPY_HISTORY shows the recent file-loading history for the table.</p><p>The copy history helps verify which files were loaded, when they were loaded, and whether the loading operation succeeded.</p>",
        "code": "ALTER PIPE AGS_GAME_AUDIENCE.RAW.PIPE_GET_NEW_FILES REFRESH;\n\n SELECT COUNT(*) AS ed_raw_rows\n FROM AGS_GAME_AUDIENCE.RAW.ED_PIPELINE_LOGS;\n\n SELECT *\n FROM TABLE(AGS_GAME_AUDIENCE.INFORMATION_SCHEMA.COPY_HISTORY(\n \tTABLE_NAME => 'AGS_GAME_AUDIENCE.RAW.ED_PIPELINE_LOGS',\n \tSTART_TIME => DATEADD('hour',-2,CURRENT_TIMESTAMP())\n ))\n ORDER BY last_load_time DESC;\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "2172f972c2",
          "html": "<p>CHECKPOINT  New course files are processed by PIPE_GET_NEW_FILES. ED_RAW_ROWS should climb as files arrive.</p><p>This step verifies that Snowpipe is actively loading files.</p><p>ALTER PIPE ... REFRESH queues eligible existing files that Snowpipe has not previously loaded.</p><p>COUNT(*) checks the number of rows inside ED_PIPELINE_LOGS.</p><p>COPY_HISTORY shows the recent file-loading history for the table.</p><p>The copy history helps verify which files were loaded, when they were loaded, and whether the loading operation succeeded.</p>"
         },
         {
          "type": "snippet",
          "id": "d194098ced",
          "lang": "sql",
          "code": "ALTER PIPE AGS_GAME_AUDIENCE.RAW.PIPE_GET_NEW_FILES REFRESH;\n\n SELECT COUNT(*) AS ed_raw_rows\n FROM AGS_GAME_AUDIENCE.RAW.ED_PIPELINE_LOGS;\n\n SELECT *\n FROM TABLE(AGS_GAME_AUDIENCE.INFORMATION_SCHEMA.COPY_HISTORY(\n \tTABLE_NAME => 'AGS_GAME_AUDIENCE.RAW.ED_PIPELINE_LOGS',\n \tSTART_TIME => DATEADD('hour',-2,CURRENT_TIMESTAMP())\n ))\n ORDER BY last_load_time DESC;\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "Transitional Task: Read ED_PIPELINE_LOGS",
        "description": "<p>CHECKPOINT  The new task definition reads ED_PIPELINE_LOGS and has no AFTER GET_NEW_FILES dependency.</p><p>This step temporarily recreates LOAD_LOGS_ENHANCED so that it reads data from the newly created ED_PIPELINE_LOGS table. First, the existing enhanced table is emptied using TRUNCATE TABLE.</p><p>The task then runs every five minutes and performs a MERGE operation.</p><p>During the merge:</p><ol><li><p>Raw event data is read from ED_PIPELINE_LOGS.</p></li><li><p>The IP address is matched with the IPInfo location table.</p></li><li><p>City, region, country, and timezone are retrieved.</p></li><li><p>UTC event time is converted into the user’s local timezone.</p></li><li><p>The day name is calculated.</p></li><li><p>The event is matched with the time-of-day lookup table.</p></li><li><p>Records not already present are inserted into LOGS_ENHANCED.</p></li><li><p>The MERGE condition helps prevent duplicate records.</p></li></ol>",
        "code": "TRUNCATE TABLE AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED;\n\n CREATE OR REPLACE TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED\n USER_TASK_MANAGED_INITIAL_WAREHOUSE_SIZE='XSMALL'\n SCHEDULE='5 minute'\n AS\n MERGE INTO AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED e\n USING (\n  SELECT logs.ip_address,logs.user_login AS gamer_name,\n     \tlogs.user_event AS game_event_name,\n     \tlogs.datetime_iso8601 AS game_event_utc,\n         loc.city,loc.region,loc.country,loc.timezone AS gamer_ltz_name,\n         CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601)\n         \tAS game_event_ltz,\n     \tDAYNAME(game_event_ltz) AS dow_name,tod.tod_name\n  FROM AGS_GAME_AUDIENCE.RAW.ED_PIPELINE_LOGS logs\n  JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address)=loc.join_key\n  AND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n  JOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU tod\n   ON HOUR(CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601))=tod.hour\n ) r\n ON r.gamer_name=e.gamer_name AND r.game_event_utc=e.game_event_utc\n AND r.game_event_name=e.game_event_name\n WHEN NOT MATCHED THEN INSERT\n (ip_address,gamer_name,game_event_name,game_event_utc,city,region,country,\n  gamer_ltz_name,game_event_ltz,dow_name,tod_name)\n VALUES\n (r.ip_address,r.gamer_name,r.game_event_name,r.game_event_utc,r.city,\n  r.region,r.country,r.gamer_ltz_name,r.game_event_ltz,r.dow_name,r.tod_name);\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "3215b32c95",
          "html": "<p>CHECKPOINT  The new task definition reads ED_PIPELINE_LOGS and has no AFTER GET_NEW_FILES dependency.</p><p>This step temporarily recreates LOAD_LOGS_ENHANCED so that it reads data from the newly created ED_PIPELINE_LOGS table. First, the existing enhanced table is emptied using TRUNCATE TABLE.</p><p>The task then runs every five minutes and performs a MERGE operation.</p><p>During the merge:</p><ol><li><p>Raw event data is read from ED_PIPELINE_LOGS.</p></li><li><p>The IP address is matched with the IPInfo location table.</p></li><li><p>City, region, country, and timezone are retrieved.</p></li><li><p>UTC event time is converted into the user’s local timezone.</p></li><li><p>The day name is calculated.</p></li><li><p>The event is matched with the time-of-day lookup table.</p></li><li><p>Records not already present are inserted into LOGS_ENHANCED.</p></li><li><p>The MERGE condition helps prevent duplicate records.</p></li></ol>"
         },
         {
          "type": "snippet",
          "id": "1d1798f642",
          "lang": "sql",
          "code": "TRUNCATE TABLE AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED;\n\n CREATE OR REPLACE TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED\n USER_TASK_MANAGED_INITIAL_WAREHOUSE_SIZE='XSMALL'\n SCHEDULE='5 minute'\n AS\n MERGE INTO AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED e\n USING (\n  SELECT logs.ip_address,logs.user_login AS gamer_name,\n     \tlogs.user_event AS game_event_name,\n     \tlogs.datetime_iso8601 AS game_event_utc,\n         loc.city,loc.region,loc.country,loc.timezone AS gamer_ltz_name,\n         CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601)\n         \tAS game_event_ltz,\n     \tDAYNAME(game_event_ltz) AS dow_name,tod.tod_name\n  FROM AGS_GAME_AUDIENCE.RAW.ED_PIPELINE_LOGS logs\n  JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(logs.ip_address)=loc.join_key\n  AND IPINFO_GEOLOC.PUBLIC.TO_INT(logs.ip_address)\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n  JOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU tod\n   ON HOUR(CONVERT_TIMEZONE('UTC',loc.timezone,logs.datetime_iso8601))=tod.hour\n ) r\n ON r.gamer_name=e.gamer_name AND r.game_event_utc=e.game_event_utc\n AND r.game_event_name=e.game_event_name\n WHEN NOT MATCHED THEN INSERT\n (ip_address,gamer_name,game_event_name,game_event_utc,city,region,country,\n  gamer_ltz_name,game_event_ltz,dow_name,tod_name)\n VALUES\n (r.ip_address,r.gamer_name,r.game_event_name,r.game_event_utc,r.city,\n  r.region,r.country,r.gamer_ltz_name,r.game_event_ltz,r.dow_name,r.tod_name);\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "Create the CDC Stream",
        "description": "<p>CHECKPOINT  The stream exists. HAS_CHANGES may initially be FALSE and becomes TRUE after Snowpipe inserts new rows.</p><p>OFFSET BEGINS NOW  A newly created stream tracks changes after its starting offset. Existing table rows do not automatically appear as new changes.</p><p>This step creates the stream ED_CDC_STREAM on the ED_PIPELINE_LOGS table.</p><p>A Snowflake stream tracks changes made to its source table. In this lab, it is used to identify newly inserted raw event records.</p><p>The stream begins tracking changes from the moment it is created. Rows already present in ED_PIPELINE_LOGS before stream creation are not automatically treated as new changes.</p><p>SYSTEM$STREAM_HAS_DATA checks whether unconsumed changes are currently available.</p>",
        "code": "CREATE OR REPLACE STREAM AGS_GAME_AUDIENCE.RAW.ED_CDC_STREAM\n ON TABLE AGS_GAME_AUDIENCE.RAW.ED_PIPELINE_LOGS;\n\n SHOW STREAMS LIKE 'ED_CDC_STREAM'\n IN SCHEMA AGS_GAME_AUDIENCE.RAW;\n\n SELECT SYSTEM$STREAM_HAS_DATA(\n  'AGS_GAME_AUDIENCE.RAW.ED_CDC_STREAM') AS has_changes;\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "2cd8e48ba1",
          "html": "<p>CHECKPOINT  The stream exists. HAS_CHANGES may initially be FALSE and becomes TRUE after Snowpipe inserts new rows.</p><p>OFFSET BEGINS NOW  A newly created stream tracks changes after its starting offset. Existing table rows do not automatically appear as new changes.</p><p>This step creates the stream ED_CDC_STREAM on the ED_PIPELINE_LOGS table.</p><p>A Snowflake stream tracks changes made to its source table. In this lab, it is used to identify newly inserted raw event records.</p><p>The stream begins tracking changes from the moment it is created. Rows already present in ED_PIPELINE_LOGS before stream creation are not automatically treated as new changes.</p><p>SYSTEM$STREAM_HAS_DATA checks whether unconsumed changes are currently available.</p>"
         },
         {
          "type": "snippet",
          "id": "c26bef054d",
          "lang": "sql",
          "code": "CREATE OR REPLACE STREAM AGS_GAME_AUDIENCE.RAW.ED_CDC_STREAM\n ON TABLE AGS_GAME_AUDIENCE.RAW.ED_PIPELINE_LOGS;\n\n SHOW STREAMS LIKE 'ED_CDC_STREAM'\n IN SCHEMA AGS_GAME_AUDIENCE.RAW;\n\n SELECT SYSTEM$STREAM_HAS_DATA(\n  'AGS_GAME_AUDIENCE.RAW.ED_CDC_STREAM') AS has_changes;\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "Inspect and Manually Consume the Stream",
        "description": "<p>WAIT IF EMPTY  Confirm PIPE_GET_NEW_FILES is RUNNING and wait for a new five-minute file. Do not recreate the stream while waiting.</p><p>This step checks the contents of the CDC stream.</p><p>The first query displays the new rows recorded by the stream. Along with the table columns, Snowflake streams normally provide metadata columns such as:</p><p>METADATA$ACTION</p><p>METADATA$ISUPDATE</p><p>METADATA$ROW_ID</p><p>The second query checks whether the stream contains unconsumed changes.</p><p>When the stream is empty, the learner should confirm that Snowpipe is running and wait for another file to arrive. The stream should not be recreated because doing so resets its tracking offset.</p>",
        "code": "SELECT * FROM AGS_GAME_AUDIENCE.RAW.ED_CDC_STREAM;\n SELECT SYSTEM$STREAM_HAS_DATA(\n  'AGS_GAME_AUDIENCE.RAW.ED_CDC_STREAM');\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "6d3140d0e6",
          "html": "<p>WAIT IF EMPTY  Confirm PIPE_GET_NEW_FILES is RUNNING and wait for a new five-minute file. Do not recreate the stream while waiting.</p><p>This step checks the contents of the CDC stream.</p><p>The first query displays the new rows recorded by the stream. Along with the table columns, Snowflake streams normally provide metadata columns such as:</p><p>METADATA$ACTION</p><p>METADATA$ISUPDATE</p><p>METADATA$ROW_ID</p><p>The second query checks whether the stream contains unconsumed changes.</p><p>When the stream is empty, the learner should confirm that Snowpipe is running and wait for another file to arrive. The stream should not be recreated because doing so resets its tracking offset.</p>"
         },
         {
          "type": "snippet",
          "id": "ec6f6dbb87",
          "lang": "sql",
          "code": "SELECT * FROM AGS_GAME_AUDIENCE.RAW.ED_CDC_STREAM;\n SELECT SYSTEM$STREAM_HAS_DATA(\n  'AGS_GAME_AUDIENCE.RAW.ED_CDC_STREAM');\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "Merge only changed rows",
        "description": "<p>CHECKPOINT  After a successful committed MERGE, processed stream rows disappear and the stream offset advances.</p><p>This step manually processes only the rows available in ED_CDC_STREAM.</p><p>Instead of scanning the entire ED_PIPELINE_LOGS table, the query reads only newly changed records captured by the stream.</p><p>The records are enriched with:</p><p>City</p><p>Region</p><p>Country</p><p>Timezone</p><p>Local event time</p><p>Day name</p><p>Time-of-day category</p><p>The MERGE inserts only records that do not already exist in LOGS_ENHANCED.</p><p>After the merge completes successfully and commits, the stream offset advances. The processed records are then considered consumed.</p>",
        "code": "MERGE INTO AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED e\n USING (\n  SELECT cdc.ip_address,cdc.user_login AS gamer_name,\n     \tcdc.user_event AS game_event_name,\n     \tcdc.datetime_iso8601 AS game_event_utc,\n         loc.city,loc.region,loc.country,loc.timezone AS gamer_ltz_name,\n         CONVERT_TIMEZONE('UTC',loc.timezone,cdc.datetime_iso8601)\n         \tAS game_event_ltz,\n     \tDAYNAME(game_event_ltz) AS dow_name,tod.tod_name\n  FROM AGS_GAME_AUDIENCE.RAW.ED_CDC_STREAM cdc\n  JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(cdc.ip_address)=loc.join_key\n  AND IPINFO_GEOLOC.PUBLIC.TO_INT(cdc.ip_address)\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n  JOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU tod\n   ON HOUR(CONVERT_TIMEZONE('UTC',loc.timezone,cdc.datetime_iso8601))=tod.hour\n ) r\n ON r.gamer_name=e.gamer_name AND r.game_event_utc=e.game_event_utc\n AND r.game_event_name=e.game_event_name\n WHEN NOT MATCHED THEN INSERT\n (ip_address,gamer_name,game_event_name,game_event_utc,city,region,country,\n  gamer_ltz_name,game_event_ltz,dow_name,tod_name)\n VALUES\n (r.ip_address,r.gamer_name,r.game_event_name,r.game_event_utc,r.city,\n  r.region,r.country,r.gamer_ltz_name,r.game_event_ltz,r.dow_name,r.tod_name);",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "35f26426e9",
          "html": "<p>CHECKPOINT  After a successful committed MERGE, processed stream rows disappear and the stream offset advances.</p><p>This step manually processes only the rows available in ED_CDC_STREAM.</p><p>Instead of scanning the entire ED_PIPELINE_LOGS table, the query reads only newly changed records captured by the stream.</p><p>The records are enriched with:</p><p>City</p><p>Region</p><p>Country</p><p>Timezone</p><p>Local event time</p><p>Day name</p><p>Time-of-day category</p><p>The MERGE inserts only records that do not already exist in LOGS_ENHANCED.</p><p>After the merge completes successfully and commits, the stream offset advances. The processed records are then considered consumed.</p>"
         },
         {
          "type": "snippet",
          "id": "0b4aa2d623",
          "lang": "sql",
          "code": "MERGE INTO AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED e\n USING (\n  SELECT cdc.ip_address,cdc.user_login AS gamer_name,\n     \tcdc.user_event AS game_event_name,\n     \tcdc.datetime_iso8601 AS game_event_utc,\n         loc.city,loc.region,loc.country,loc.timezone AS gamer_ltz_name,\n         CONVERT_TIMEZONE('UTC',loc.timezone,cdc.datetime_iso8601)\n         \tAS game_event_ltz,\n     \tDAYNAME(game_event_ltz) AS dow_name,tod.tod_name\n  FROM AGS_GAME_AUDIENCE.RAW.ED_CDC_STREAM cdc\n  JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(cdc.ip_address)=loc.join_key\n  AND IPINFO_GEOLOC.PUBLIC.TO_INT(cdc.ip_address)\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n  JOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU tod\n   ON HOUR(CONVERT_TIMEZONE('UTC',loc.timezone,cdc.datetime_iso8601))=tod.hour\n ) r\n ON r.gamer_name=e.gamer_name AND r.game_event_utc=e.game_event_utc\n AND r.game_event_name=e.game_event_name\n WHEN NOT MATCHED THEN INSERT\n (ip_address,gamer_name,game_event_name,game_event_utc,city,region,country,\n  gamer_ltz_name,game_event_ltz,dow_name,tod_name)\n VALUES\n (r.ip_address,r.gamer_name,r.game_event_name,r.game_event_utc,r.city,\n  r.region,r.country,r.gamer_ltz_name,r.game_event_ltz,r.dow_name,r.tod_name);",
          "label": null
         }
        ]
       },
       {
        "title": "Create the Conditional CDC Task",
        "description": "<p><mark data-color=\"#b6d7a8\">CHECKPOINT  CDC_LOAD_LOGS_ENHANCED is started, serverless, scheduled every five minutes, and has a stream-data WHEN condition.</mark></p><p>This step replaces the transitional task with the final CDC-based task named CDC_LOAD_LOGS_ENHANCED.</p><p>The old LOAD_LOGS_ENHANCED task is suspended.</p><p>The new task:</p><p>Runs on a five-minute schedule.</p><p>Uses a serverless warehouse.</p><p>Checks whether ED_CDC_STREAM contains data.</p><p>Executes the MERGE only when stream data is available.</p>",
        "code": "ALTER TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED SUSPEND;\n\n CREATE OR REPLACE TASK AGS_GAME_AUDIENCE.RAW.CDC_LOAD_LOGS_ENHANCED\n USER_TASK_MANAGED_INITIAL_WAREHOUSE_SIZE='XSMALL'\n SCHEDULE='5 minute'\n WHEN SYSTEM$STREAM_HAS_DATA('AGS_GAME_AUDIENCE.RAW.ED_CDC_STREAM')\n AS\n MERGE INTO AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED e\n USING (\n  SELECT cdc.ip_address,cdc.user_login AS gamer_name,\n     \tcdc.user_event AS game_event_name,\n     \tcdc.datetime_iso8601 AS game_event_utc,\n         loc.city,loc.region,loc.country,loc.timezone AS gamer_ltz_name,\n         CONVERT_TIMEZONE('UTC',loc.timezone,cdc.datetime_iso8601)\n         \tAS game_event_ltz,\n     \tDAYNAME(game_event_ltz) AS dow_name,tod.tod_name\n  FROM AGS_GAME_AUDIENCE.RAW.ED_CDC_STREAM cdc\n  JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(cdc.ip_address)=loc.join_key\n  AND IPINFO_GEOLOC.PUBLIC.TO_INT(cdc.ip_address)\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n  JOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU tod\n   ON HOUR(CONVERT_TIMEZONE('UTC',loc.timezone,cdc.datetime_iso8601))=tod.hour\n ) r\n ON r.gamer_name=e.gamer_name AND r.game_event_utc=e.game_event_utc\n AND r.game_event_name=e.game_event_name\n WHEN NOT MATCHED THEN INSERT\n (ip_address,gamer_name,game_event_name,game_event_utc,city,region,country,\n  gamer_ltz_name,game_event_ltz,dow_name,tod_name)\n VALUES\n (r.ip_address,r.gamer_name,r.game_event_name,r.game_event_utc,r.city,\n  r.region,r.country,r.gamer_ltz_name,r.game_event_ltz,r.dow_name,r.tod_name);\n\n\n\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "3fdc103cac",
          "html": "<p><mark data-color=\"#b6d7a8\">CHECKPOINT  CDC_LOAD_LOGS_ENHANCED is started, serverless, scheduled every five minutes, and has a stream-data WHEN condition.</mark></p><p>This step replaces the transitional task with the final CDC-based task named CDC_LOAD_LOGS_ENHANCED.</p><p>The old LOAD_LOGS_ENHANCED task is suspended.</p><p>The new task:</p><p>Runs on a five-minute schedule.</p><p>Uses a serverless warehouse.</p><p>Checks whether ED_CDC_STREAM contains data.</p><p>Executes the MERGE only when stream data is available.</p>"
         },
         {
          "type": "snippet",
          "id": "d847a93f9c",
          "lang": "sql",
          "code": "ALTER TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED SUSPEND;\n\n CREATE OR REPLACE TASK AGS_GAME_AUDIENCE.RAW.CDC_LOAD_LOGS_ENHANCED\n USER_TASK_MANAGED_INITIAL_WAREHOUSE_SIZE='XSMALL'\n SCHEDULE='5 minute'\n WHEN SYSTEM$STREAM_HAS_DATA('AGS_GAME_AUDIENCE.RAW.ED_CDC_STREAM')\n AS\n MERGE INTO AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED e\n USING (\n  SELECT cdc.ip_address,cdc.user_login AS gamer_name,\n     \tcdc.user_event AS game_event_name,\n     \tcdc.datetime_iso8601 AS game_event_utc,\n         loc.city,loc.region,loc.country,loc.timezone AS gamer_ltz_name,\n         CONVERT_TIMEZONE('UTC',loc.timezone,cdc.datetime_iso8601)\n         \tAS game_event_ltz,\n     \tDAYNAME(game_event_ltz) AS dow_name,tod.tod_name\n  FROM AGS_GAME_AUDIENCE.RAW.ED_CDC_STREAM cdc\n  JOIN IPINFO_GEOLOC.DEMO.LOCATION loc\n   ON IPINFO_GEOLOC.PUBLIC.TO_JOIN_KEY(cdc.ip_address)=loc.join_key\n  AND IPINFO_GEOLOC.PUBLIC.TO_INT(cdc.ip_address)\n  \tBETWEEN loc.start_ip_int AND loc.end_ip_int\n  JOIN AGS_GAME_AUDIENCE.RAW.TIME_OF_DAY_LU tod\n   ON HOUR(CONVERT_TIMEZONE('UTC',loc.timezone,cdc.datetime_iso8601))=tod.hour\n ) r\n ON r.gamer_name=e.gamer_name AND r.game_event_utc=e.game_event_utc\n AND r.game_event_name=e.game_event_name\n WHEN NOT MATCHED THEN INSERT\n (ip_address,gamer_name,game_event_name,game_event_utc,city,region,country,\n  gamer_ltz_name,game_event_ltz,dow_name,tod_name)\n VALUES\n (r.ip_address,r.gamer_name,r.game_event_name,r.game_event_utc,r.city,\n  r.region,r.country,r.gamer_ltz_name,r.game_event_ltz,r.dow_name,r.tod_name);\n\n\n\n\n",
          "label": null
         }
        ]
       },
       {
        "title": "Confirm End-to-End Data Flow",
        "description": "<p>CHECKPOINT  The pipe is RUNNING; ED_PIPELINE_LOGS grows; CDC task succeeds when stream data exists; enhanced rows increase for IPInfo-matched records.</p><p>This final verification step checks every major component of the pipeline.</p><p>The queries verify:</p><ol><li><p>Whether Snowpipe is running.</p></li><li><p>Whether raw pipeline rows are increasing.</p></li><li><p>Whether the stream currently has unprocessed data.</p></li><li><p>Whether enhanced records are increasing.</p></li><li><p>Whether the CDC task is executing successfully.</p></li></ol>",
        "code": "SELECT PARSE_JSON(SYSTEM$PIPE_STATUS(\n  'AGS_GAME_AUDIENCE.RAW.PIPE_GET_NEW_FILES')) AS pipe_status;\n\n SELECT COUNT(*) AS ed_pipeline_rows\n FROM AGS_GAME_AUDIENCE.RAW.ED_PIPELINE_LOGS;\n\n SELECT SYSTEM$STREAM_HAS_DATA(\n  'AGS_GAME_AUDIENCE.RAW.ED_CDC_STREAM') AS pending_stream_data;\n\n SELECT COUNT(*) AS enhanced_rows\n FROM AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED;\n\n SELECT name,state,error_message\n FROM TABLE(AGS_GAME_AUDIENCE.INFORMATION_SCHEMA.TASK_HISTORY(\n  TASK_NAME=>'CDC_LOAD_LOGS_ENHANCED',RESULT_LIMIT=>20))\n ORDER BY scheduled_time DESC;\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "e7e09532cb",
          "html": "<p>CHECKPOINT  The pipe is RUNNING; ED_PIPELINE_LOGS grows; CDC task succeeds when stream data exists; enhanced rows increase for IPInfo-matched records.</p><p>This final verification step checks every major component of the pipeline.</p><p>The queries verify:</p><ol><li><p>Whether Snowpipe is running.</p></li><li><p>Whether raw pipeline rows are increasing.</p></li><li><p>Whether the stream currently has unprocessed data.</p></li><li><p>Whether enhanced records are increasing.</p></li><li><p>Whether the CDC task is executing successfully.</p></li></ol>"
         },
         {
          "type": "snippet",
          "id": "461be9ce96",
          "lang": "sql",
          "code": "SELECT PARSE_JSON(SYSTEM$PIPE_STATUS(\n  'AGS_GAME_AUDIENCE.RAW.PIPE_GET_NEW_FILES')) AS pipe_status;\n\n SELECT COUNT(*) AS ed_pipeline_rows\n FROM AGS_GAME_AUDIENCE.RAW.ED_PIPELINE_LOGS;\n\n SELECT SYSTEM$STREAM_HAS_DATA(\n  'AGS_GAME_AUDIENCE.RAW.ED_CDC_STREAM') AS pending_stream_data;\n\n SELECT COUNT(*) AS enhanced_rows\n FROM AGS_GAME_AUDIENCE.ENHANCED.LOGS_ENHANCED;\n\n SELECT name,state,error_message\n FROM TABLE(AGS_GAME_AUDIENCE.INFORMATION_SCHEMA.TASK_HISTORY(\n  TASK_NAME=>'CDC_LOAD_LOGS_ENHANCED',RESULT_LIMIT=>20))\n ORDER BY scheduled_time DESC;\n\n",
          "label": null
         }
        ]
       }
      ]
     },
     {
      "title": "WRAP UP......",
      "overview": null,
      "explanation": null,
      "output": null,
      "outputCode": null,
      "flow": null,
      "steps": [
       {
        "title": "Stop All Pipeline Automation",
        "description": "<table><colgroup><col></colgroup><tbody><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"586\"><p><span><strong>RUN ONLY FOR OBJECTS THAT EXIST  </strong></span><span>SHOW the objects first. An ALTER statement returns an error when that task or pipe was never created.</span></p></td></tr></tbody></table><p><span><strong>CHECKPOINT  </strong></span><span>Confirm no course automation is still consuming credits.<br>Expected: Relevant tasks are suspended and PIPE_GET_NEW_FILES is paused.</span></p>",
        "code": "USE ROLE SYSADMIN;\n\n SHOW TASKS IN SCHEMA AGS_GAME_AUDIENCE.RAW;\n SHOW PIPES IN SCHEMA AGS_GAME_AUDIENCE.RAW;\n\n ALTER TASK AGS_GAME_AUDIENCE.RAW.GET_NEW_FILES SUSPEND;\n ALTER TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED SUSPEND;\n ALTER TASK AGS_GAME_AUDIENCE.RAW.CDC_LOAD_LOGS_ENHANCED SUSPEND;\n\n ALTER PIPE AGS_GAME_AUDIENCE.RAW.PIPE_GET_NEW_FILES\n SET PIPE_EXECUTION_PAUSED = TRUE;\n\n",
        "codeLang": "sql",
        "image": null,
        "imageCaption": null,
        "blocks": [
         {
          "type": "description",
          "id": "63e9bc7b6e",
          "html": "<table><colgroup><col></colgroup><tbody><tr><td colspan=\"1\" rowspan=\"1\" colwidth=\"586\"><p><span><strong>RUN ONLY FOR OBJECTS THAT EXIST  </strong></span><span>SHOW the objects first. An ALTER statement returns an error when that task or pipe was never created.</span></p></td></tr></tbody></table><p><span><strong>CHECKPOINT  </strong></span><span>Confirm no course automation is still consuming credits.<br>Expected: Relevant tasks are suspended and PIPE_GET_NEW_FILES is paused.</span></p>"
         },
         {
          "type": "snippet",
          "id": "625c657b8e",
          "lang": "sql",
          "code": "USE ROLE SYSADMIN;\n\n SHOW TASKS IN SCHEMA AGS_GAME_AUDIENCE.RAW;\n SHOW PIPES IN SCHEMA AGS_GAME_AUDIENCE.RAW;\n\n ALTER TASK AGS_GAME_AUDIENCE.RAW.GET_NEW_FILES SUSPEND;\n ALTER TASK AGS_GAME_AUDIENCE.RAW.LOAD_LOGS_ENHANCED SUSPEND;\n ALTER TASK AGS_GAME_AUDIENCE.RAW.CDC_LOAD_LOGS_ENHANCED SUSPEND;\n\n ALTER PIPE AGS_GAME_AUDIENCE.RAW.PIPE_GET_NEW_FILES\n SET PIPE_EXECUTION_PAUSED = TRUE;\n\n",
          "label": null
         }
        ]
       }
      ]
     }
    ]
   }
  ]
 }
];

export const LAB_STATS = {
  courses: 2,
  labs: 6,
  modules: 28,
  steps: 138,
} as const;
